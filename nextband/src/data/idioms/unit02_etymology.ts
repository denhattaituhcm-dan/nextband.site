// unit02_etymology.ts
export interface IdiomEtymology {
  literal_image: string;
  figurative_connection: string;
  historical_context: string;
  deep_example: string;
  evidence_category: "DOCUMENTED ORIGIN" | "PLAUSIBLE IMAGE/MEANING CONNECTION" | "ORIGIN UNCERTAIN";
  sources: { title: string; url?: string }[];
}

export const UNIT_02_ETYMOLOGY: Record<string, IdiomEtymology> = {
  "2_1_losetouch": {
    literal_image: "Mất đi sự tiếp xúc vật lý hoặc khoảng cách chạm tới nhau (physical contact / touch distance).",
    figurative_connection: "Xuất phát từ nguyên lý không gian: hai người đứng gần có thể chạm tay vào nhau để cảm nhận sự hiện diện. Khi khoảng cách địa lý hoặc thời gian kéo giãn ra mà không có thư từ, điện thoại kết nối, sự gắn kết xúc giác vô hình bị đứt gãy, dẫn đến việc không còn tin tức hay mối liên lạc nào nữa.",
    historical_context: "Theo ghi nhận của OED, 'keep touch' hay 'lose touch' ban đầu gắn liền với đội hình duyệt binh và chiến thuật quân sự thế kỷ 18: binh sĩ phải giữ cự ly chạm khẽ cánh tay vào nhau để giữ hàng lối; nếu đi chệch khỏi hàng thì xem như 'lost touch'. Sau đó mở rộng sang giao tiếp xã hội vào thế kỷ 19.",
    deep_example: "Sau khi tốt nghiệp trung học mỗi người một ngả: 'I lost touch with most of my high school classmates when they moved abroad.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - touch (n.)", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - Keep in touch / Lose touch" }
    ]
  },
  "2_1_keepintouch": {
    literal_image: "Duy trì sự tiếp xúc liên tục, luôn trong tầm với chạm tới nhau.",
    figurative_connection: "Ngược lại với 'lose touch', cụm từ này ví việc gửi thư, gọi điện thoại, nhắn tin như hành động 'chạm' vào nhau qua không gian để giữ cho mối quan hệ luôn ấm áp, thân thiết và không bị nguội lạnh hay xa cách.",
    historical_context: "Cùng nguồn gốc quân sự và chuyển nghĩa sang giao tiếp xã hội trong thế kỷ 19 khi hệ thống bưu chính và điện tín phát triển mạnh.",
    deep_example: "Dù cách nhau nửa vòng trái đất: 'We still keep in touch via weekly video calls.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - keep touch", url: "https://www.oed.com" },
      { title: "The Idioms - Keep in touch", url: "https://www.theidioms.com" }
    ]
  },
  "2_1_houseonfire": {
    literal_image: "Một ngôi nhà mái tranh gỗ thời xưa bốc hỏa, ngọn lửa lan nhanh với tốc độ khủng khiếp và sức nóng dữ dội.",
    figurative_connection: "Thời xưa nhà làm bằng gỗ và rơm rạ, khi bắt lửa thì cháy bùng lên cực kỳ nhanh và không gì dập nổi. Thành ngữ mượn hình tượng ngọn lửa bùng cháy dữ dội để diễn tả hai người vừa gặp nhau là đã 'bắt sóng', nói cười rôm rả, thân thiết nhanh đến bất ngờ.",
    historical_context: "Ban đầu trong thế kỷ 18–19, cụm 'like a house on fire' là một trạng từ so sánh tốc độ (làm việc gì cực nhanh và mạnh mẽ). Sau đó chuyển dần sang đời sống xã hội để miêu tả tình bạn gắn kết chớp nhoáng (get on like a house on fire).",
    deep_example: "Cy và Dan lần đầu gặp nhau ở câu lạc bộ cờ vua nhưng 'got on like a house on fire' vì có chung hàng chục sở thích quái chiêu.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - house on fire", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - Like a house on fire", url: "https://www.phrases.org.uk" }
    ]
  },
  "2_1_strikeup": {
    literal_image: "Hành động nhạc công gảy mạnh dây đàn hoặc ban nhạc đồng loạt cất lên bản nhạc phá tan bầu không khí tĩnh lặng.",
    figurative_connection: "Động từ 'strike' trong âm nhạc chỉ việc gảy đàn lia, gõ trống hoặc kéo mạnh vĩ cầm để bắt đầu tấu nhạc ('the band struck up a tune'). Khi áp dụng vào quan hệ con người, 'strike up a friendship/conversation' miêu tả việc chủ động bắt chuyện, bắt nhịp làm quen một cách tự nhiên và đầy năng lượng.",
    historical_context: "Phát triển từ thuật ngữ trình diễn dàn nhạc và hòa tấu âm nhạc thế kỷ 16–17 trong tiếng Anh, sau đó chuyển nghĩa sang khởi đầu mối quan hệ vào thế kỷ 18.",
    deep_example: "Trong chuyến tàu đêm dài 6 tiếng: 'I struck up a friendship with the traveler sitting opposite me.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - strike up (phrasal v.)", url: "https://www.oed.com" },
      { title: "Oxford Learner's Dictionaries" }
    ]
  },
  "2_1_fairweather": {
    literal_image: "Thời tiết đẹp trời, sóng yên biển lặng (fair weather) đối lập với giông bão hiểm nguy.",
    figurative_connection: "Trong hàng hải, thuyền viên 'fair-weather' là người chỉ thích ra khơi khi trời yên biển lặng, nhưng hễ bão tố ập đến là bỏ trốn. Ẩn dụ chuyển sang người bạn cơ hội: khi bạn giàu sang, vui vẻ thì họ bám lấy; nhưng khi bạn sa cơ lỡ vận, khó khăn thì họ lập tức lặn mất tăm.",
    historical_context: "Cảm hứng triết học từ Cicero (*De Amicitia*, 44 TCN: 'Bạn thật sự chỉ nhận ra trong nghịch cảnh'). Thành ngữ tiếng Anh 'fair-weather friend' chính thức được ghi nhận trong văn bản vào năm 1685 (William Clark).",
    deep_example: "Khi công ty phá sản, Tom mới nhận ra hầu hết những người hay đi ăn nhậu cùng mình chỉ là 'fair-weather friends'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - fair-weather friend (1685)", url: "https://www.oed.com" },
      { title: "Cicero, De Amicitia (On Friendship)" }
    ]
  },
  "2_1_soulmate": {
    literal_image: "Hai linh hồn (soul) hòa chung làm một với người bạn đồng hành (mate).",
    figurative_connection: "Từ 'mate' chỉ người cùng chia sẻ chiếc bàn ăn hoặc người bạn chí cốt. 'Soulmate' nâng tầm lên mức cao nhất: một người thấu hiểu đến tận sâu thẳm tâm can, đồng điệu tuyệt đối về tư tưởng, tâm hồn và cảm xúc.",
    historical_context: "Từ này do chính đại thi hào lãng mạn người Anh Samuel Taylor Coleridge sáng tạo ra (coined) trong bức thư năm 1822 gửi một thiếu nữ về hôn nhân: ông khuyên rằng để hạnh phúc, người ta không chỉ cần 'house-mate' (bạn chung nhà) mà nhất thiết phải tìm được một 'soul-mate'.",
    deep_example: "Cùng yêu thơ văn cổ và có chung lý tưởng sống: 'They spent hours talking every evening and knew they had found their soulmate.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - soulmate (Coleridge 1822)", url: "https://www.oed.com" },
      { title: "Samuel Taylor Coleridge Letters Archive" }
    ]
  },
  "2_1_mutualfriend": {
    literal_image: "Điểm giao thoa (intersection) của hai vòng tròn tình bạn chia sẻ chung một mắt xích.",
    figurative_connection: "'Mutual' gốc Latin 'mutuus' (qua lại, hỗ trợ lẫn nhau). 'A mutual friend' là người bạn của A và đồng thời cũng là bạn của B, đóng vai trò cây cầu kết nối hai người xa lạ đến với nhau.",
    historical_context: "Cụm từ được chuẩn hóa trong đời sống xã hội Anh và trở nên nổi tiếng trong văn học qua nhan đề cuốn tiểu thuyết cuối cùng của Charles Dickens: *Our Mutual Friend* (1865).",
    deep_example: "Họ tình cờ quen nhau tại một bữa tiệc sinh nhật nhờ 'a mutual friend' giới thiệu.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - mutual (adj.)", url: "https://www.oed.com" },
      { title: "Charles Dickens, Our Mutual Friend (1865)" }
    ]
  },
  "2_1_driftapart": {
    literal_image: "Hai con thuyền không neo đậu bị dòng hải lưu (drift current) và gió đẩy trôi dần về hai hướng khác nhau trên mặt biển.",
    figurative_connection: "Từ 'drift' trong hàng hải chỉ sự trôi dạt thụ động theo dòng nước. Khi áp dụng cho mối quan hệ, 'drift apart' không phải là cãi vã hay giận hờn, mà là do cuộc sống bận rộn, định hướng khác nhau khiến hai người bạn từ từ xa cách nhau một cách vô thức, không ai nhận ra.",
    historical_context: "Gốc từ hàng hải thế kỷ 17, chuyển sang nghĩa bóng miêu tả tình cảm bạn bè phai nhạt dần từ năm 1859 (ghi nhận OED).",
    deep_example: "Sau khi Mia chuyển sang học boxing còn bạn thân tiếp tục hát hợp xướng, họ không hề cãi nhau nhưng cứ thế 'drifted apart'.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - drift apart (1859)", url: "https://www.oed.com" },
      { title: "Online Etymology Dictionary - drift" }
    ]
  },
  "2_1_hititoff": {
    literal_image: "Bắn trúng hồng tâm (hit the mark) hoặc sự ăn khớp chuẩn xác của một cơ cấu chuyển động.",
    figurative_connection: "Động từ 'hit' từ thời Trung Anh vốn có nghĩa là gặp gỡ đúng thời điểm, đánh trúng điểm chung. 'Hit it off' miêu tả khoảnh khắc hai con người vừa gặp nhau là các tính cách lập tức ăn khớp, không hề có sự gượng gạo hay thăm dò.",
    historical_context: "Phát triển từ cụm từ lóng thế kỷ 17 'to hit it' (tìm thấy điểm đồng thuận, tâm đầu ý hợp), đến cuối thế kỷ 18 (khoảng 1780) bổ sung thêm 'off' để nhấn mạnh sự khởi đầu suôn sẻ.",
    deep_example: "'My wife and I hit it off immediately when we first met at a country music concert.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - hit it off", url: "https://www.oed.com" },
      { title: "Grammarist - Hit it off etymology" }
    ]
  },
  "2_1_wrongfoot": {
    literal_image: "Bước bước chân đầu tiên bằng chân trái (chân xui xẻo theo quan niệm cổ La Mã) hoặc sẩy chân ngã dúi dụi khi bắt đầu cuộc chạy đua.",
    figurative_connection: "Trong văn hóa La Mã cổ đại, chân trái (sinister) bị coi là điềm gở; khách vào nhà phải bước chân phải qua ngưỡng cửa. Trong thể thao hay đi lại, sải bước sai nhịp đầu tiên sẽ khiến cả chặng đường sau đó bị loạng choạng. Nghĩa bóng chỉ ấn tượng ban đầu dở tệ hoặc sự khởi đầu đầy trắc trở trong một mối quan hệ.",
    historical_context: "Bắt nguồn từ tín ngưỡng dân gian bước chân vào nhà của người La Mã và được Shakespeare nhắc đến trong kịch *King John* (1595: 'the better foot before'). Dạng thành ngữ hiện đại 'get off on the wrong foot' định hình vào cuối thế kỷ 19.",
    deep_example: "Anh chàng đến buổi hẹn đầu tiên trễ 1 tiếng lại còn quên tên bạn gái: 'They definitely got off on the wrong foot.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - wrong foot", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - Get off on the wrong foot" }
    ]
  },
  "2_2_chipoff": {
    literal_image: "Mẩu dăm gỗ hoặc mảnh đá nhỏ (chip) được đục đẽo văng ra từ một tảng đá/khúc gỗ tảng lớn (block).",
    figurative_connection: "Mảnh đá nhỏ văng ra từ tảng đá mẹ luôn có cùng chất liệu khoáng sản, màu sắc và vân đá y hệt như tảng đá lớn. Ẩn dụ ví đứa con như mảnh vụn được tạc ra từ chính người cha/người mẹ: giống hệt phụ huynh từ ngoại hình đến tính khí và cử chỉ.",
    historical_context: "Ý niệm xuất hiện từ thời Hy Lạp cổ đại (nhà thơ Theocritus, khoảng 270 TCN). Vào tiếng Anh từ thế kỷ 17 với dạng 'chip of the same block' (1621, Giám mục Robert Sanderson) và John Milton (1642: 'chip of the old block'). Đến thế kỷ 19 chuyển thành 'chip off the old block'.",
    deep_example: "Thấy cậu con trai 8 tuổi cũng thích tháo lắp máy móc hệt như ông bố kỹ sư: 'He is truly a chip off the old block!'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - chip of/off the old block", url: "https://www.oed.com" },
      { title: "John Milton, An Apology for Smectymnuus (1642)" }
    ]
  },
  "2_2_familyfriend": {
    literal_image: "Người bạn quen biết và gắn bó với toàn bộ các thành viên trong cả gia đình chứ không riêng một cá nhân.",
    figurative_connection: "Mối quan hệ bạn bè đã vượt qua ranh giới xã giao thông thường để trở thành người thân thiết như ruột thịt, cùng ăn cơm chung bàn và có mặt trong mọi dịp lễ trọng của dòng họ.",
    historical_context: "Phát triển ngôn ngữ tự nhiên miêu tả quan hệ xã hội truyền thống trong văn hóa gia đình Anh-Mỹ.",
    deep_example: "'Jade is a family friend. She grew up on the same street as us.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford Learner's Dictionaries - family friend", url: "https://www.oxfordlearnersdictionaries.com" }
    ]
  },
  "2_2_blacksheep": {
    literal_image: "Một con cừu có bộ lông đen tuyền sinh ra giữa một đàn cừu toàn lông trắng muốt.",
    figurative_connection: "Trong di truyền học cừu, lông đen là gen lặn hiếm gặp. Thời xưa len trắng nhuộm được màu nên bán rất đắt, còn len cừu đen không nhuộm được nên bị thương lái chê bai, coi là đồ bỏ đi và người nuôi cừu xem là xui xẻo. Ẩn dụ chuyển sang người con cá biệt, quậy phá, đi ngược lại truyền thống tốt đẹp của dòng họ.",
    historical_context: "Bản dịch Kinh Thánh của Myles Coverdale năm 1535 (Genesis 30:32). Ghi nhận thành ngữ chỉ kẻ làm ô danh dòng họ trong tác phẩm của Thomas Shepard năm 1640 (*The Sincere Convert*) và đi vào đời sống dân gian thế kỷ 18.",
    deep_example: "Cả nhà đều là bác sĩ mẫu mực, riêng người chú từng ba lần vào tù vì cờ bạc: 'Uncle Tony is the black sheep of the family.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - black sheep", url: "https://www.oed.com" },
      { title: "Phrases.org.uk - The black sheep of the family" }
    ]
  },
  "2_2_familyheirloom": {
    literal_image: "Một công cụ sinh nhai, đồ đạc quý giá (loom) được truyền lại cho người thừa kế (heir).",
    figurative_connection: "Từ 'loom' trong tiếng Anh cổ (loma) vốn không phải là khung cửi dệt vải, mà là từ cổ chỉ bất kỳ 'công cụ, đồ đạc, vật dụng sinh kế' nào trong nhà. Kết hợp với 'heir' (người thừa kế), nó mang nghĩa món đồ gia truyền có giá trị lịch sử và tình cảm sâu đậm được chuyển giao qua nhiều đời.",
    historical_context: "Thuật ngữ pháp lý bất động sản và quyền thừa kế thời phong kiến Anh thế kỷ 15. Từ thế kỷ 17 (1610s), chuyển thành danh từ chung chỉ mọi báu vật, kỷ vật gia truyền.",
    deep_example: "Chiếc bình sứ cổ từ thế kỷ 19: 'That antique vase is a family heirloom passed down to my grandmother.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - heirloom", url: "https://www.oed.com" },
      { title: "Online Etymology Dictionary - heirloom" }
    ]
  },
  "2_2_closeknit": {
    literal_image: "Tấm vải len được đan bằng những mũi kim cực kỳ khít khao, sít sao (tightly knit) không một kẽ hở.",
    figurative_connection: "Trong kỹ thuật đan len truyền thống, các vòng sợi đan chặt vào nhau tạo nên tấm áo cực kỳ bền chắc, giữ ấm tốt và gió không thể lọt qua. Khi ví với gia đình, nó miêu tả các thành viên gắn kết keo sơn, luôn che chở bảo bọc nhau trước mọi sóng gió cuộc đời.",
    historical_context: "Phát triển từ nghề dệt may gia đình thế kỷ 18–19 tại Anh, chuyển sang ẩn dụ xã hội miêu tả cộng đồng hoặc gia đình đoàn kết khăng khít.",
    deep_example: "'We're a close-knit family. We always meet up for birthdays and holidays.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - close-knit", url: "https://www.oed.com" },
      { title: "The Idioms - Close-knit" }
    ]
  },
  "2_2_startafamily": {
    literal_image: "Khởi động và đặt nền móng cho một tế bào gia đình mới bằng việc sinh đứa con đầu lòng.",
    figurative_connection: "Hai người kết hôn là một cặp đôi (a couple). Chỉ khi đứa con đầu tiên chào đời, họ mới chính thức trở thành cha mẹ và một thế hệ tiếp nối mới được 'khởi động' (start a family).",
    historical_context: "Cách diễn đạt chuẩn mực mang tính trang trọng và tích cực trong văn hóa gia đình phương Tây cận đại.",
    deep_example: "'We're moving to a bigger house with a garden because we're hoping to start a family soon.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Cambridge Dictionary - start a family", url: "https://dictionary.cambridge.org" }
    ]
  },
  "2_2_immediatefamily": {
    literal_image: "Vòng tròn huyết thống gần nhất, không hề có bất kỳ mắt xích trung gian nào ngăn cách (immediate).",
    figurative_connection: "'Immediate' từ tiếng Latin 'immediatus' (không có vật trung gian ở giữa). Đây là những người gắn bó máu thịt trực tiếp nhất: cha mẹ sinh ra ta, con cái do ta sinh ra, vợ chồng và anh chị em ruột thịt cùng một mái nhà.",
    historical_context: "Thuật ngữ pháp luật hộ tịch và quyền thừa kế trong Thông luật Anh (Common Law) để phân định quyền lợi ruột thịt trực tiếp.",
    deep_example: "'During the pandemic lockdown, only immediate family members were allowed to visit the patient.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - immediate (adj.)", url: "https://www.oed.com" },
      { title: "Legal Information Institute - Immediate Family" }
    ]
  },
  "2_2_bringup": {
    literal_image: "Hành động nâng đỡ một đứa trẻ từ thấp bé lên cao lớn trưởng thành cả về thể xác lẫn đạo đức.",
    figurative_connection: "Phrasal verb kết hợp giữa 'bring' (mang, dẫn dắt) và 'up' (lên cao). Không chỉ là nuôi ăn uống cho lớn xác, mà là giáo dục, uốn nắn nhân cách và chỉ bảo đạo lý làm người.",
    historical_context: "Xuất hiện trong tiếng Anh từ thời Trung Cổ, phản ánh trách nhiệm sư phạm và đạo đức của cha mẹ đối với con cái.",
    deep_example: "'We're bringing up our children to be kind to animals and respect elderly people.'",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      { title: "Oxford English Dictionary (OED) - bring up", url: "https://www.oed.com" }
    ]
  },
  "2_2_extendedfamily": {
    literal_image: "Cành cây gia phả vươn dài và tỏa rộng (extended) ra các nhánh phụ xung quanh gốc cây chính.",
    figurative_connection: "Từ gia đình hạt nhân cốt lõi (bố mẹ - con cái), cành cây huyết thống được 'kéo dài' ra để ôm trọn cả ông bà, chú bác, cô dì, cháu chắt thành một đại gia đình nhiều thế hệ.",
    historical_context: "Thuật ngữ nhân học và xã hội học thế kỷ 20 đối chiếu cấu trúc đại gia đình truyền thống với gia đình hạt nhân thời công nghiệp hóa.",
    deep_example: "'Boris often asks members of his extended family, like his grandmother and aunt, to help with childcare.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - extended family", url: "https://www.oed.com" },
      { title: "Anthropological Kinship Studies" }
    ]
  },
  "2_2_runinthefamily": {
    literal_image: "Dòng chảy huyết quản (stream/bloodline) cuồn cuộn chảy xuyên suốt qua nhiều thế hệ như một dòng sông.",
    figurative_connection: "Từ 'run' ở đây mang nghĩa dòng chảy liên tục không ngừng nghỉ. Tiền thân của cụm này là 'runs in the blood' (chảy trong máu). Khi một nét tính cách, năng khiếu âm nhạc hay mái tóc xoăn xuất hiện ở cả ông, cha và cháu, người ta thấy rõ dòng chảy di truyền đó đang 'chạy' dọc theo gia phả.",
    historical_context: "Phát triển từ quan niệm y học thế kỷ 17 về huyết thống ('in the blood'), định hình thành ngữ hiện đại 'run in the family' từ khoảng năm 1771 (ghi nhận OED).",
    deep_example: "'Curly hair runs in our family, and my daughter, mom, and I all have it.'",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      { title: "Oxford English Dictionary (OED) - run in the family (1771)", url: "https://www.oed.com" },
      { title: "Online Etymology Dictionary - run" }
    ]
  }
};
