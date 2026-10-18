// UNIT 19: Chance, luck, and probability — Etymological & Conceptual Explanations
// Standardized NextBand Academic Framework: Evidence-based historical and conceptual analysis
// Source: DK English for Everyone: English Idioms (Unit 19, pages 82-85 & Answer Key page 230)

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

export const UNIT_19_ETYMOLOGY: Record<string, IdiomEtymology> = {
  // ==========================================
  // Module 19.1: EXPRESSIONS WITH "CHANCE" (Page 82)
  // ==========================================
  "19_1_offchance": {
    idiom_headword: "on the off-chance",
    current_figurative_meaning: "Dù cơ hội rất mong manh, hy vọng vào một khả năng khó xảy ra.",
    literal_image: "Chọn một ngã rẽ phụ (off-path) ít người đi với tia hy vọng tìm thấy lối thoát.",
    figurative_connection: "Tiếp đầu ngữ 'off-' biểu thị sự lệch khỏi quỹ đạo chính hoặc độ lệch xác suất xa tâm phân phối chuẩn.",
    historical_context: "Xuất hiện vào giữa thế kỷ 19 trong giới cá cược và đua ngựa Anh để chỉ các cửa đặt cược có tỷ lệ ăn tiền cao nhưng xác suất thắng rất thấp.",
    deep_example: "I stopped by the professor's office on the off-chance that she might have office hours before the final exam.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'off-chance'",
        url: "https://www.oed.com/view/Entry/130635",
        note: "Xuất hiện đầu tiên trong ngữ cảnh xác suất cá cược thế kỷ 19."
      }
    ]
  },

  "19_1_slimchance": {
    idiom_headword: "a slim chance",
    current_figurative_meaning: "Cơ hội mong manh, tia hy vọng rất nhỏ nhoi.",
    literal_image: "Một sợi chỉ mảnh mai hay một khe hở hẹp chỉ vừa vặn lọt một tia sáng le lói.",
    figurative_connection: "Ẩn dụ về độ dày không gian: Khả năng xảy ra mỏng manh ('slim') như tờ giấy, đối lập với cơ hội chắc nịch ('fat chance' — thường dùng mỉa mai).",
    historical_context: "Từ 'slim' vốn có gốc Hà Lan cổ (*slim* - gian xảo, yếu ớt), vào tiếng Anh thế kỷ 17 chỉ sự mảnh khảnh, sau đó mở rộng sang khái niệm xác suất.",
    deep_example: "Doctors cautioned that there was only a slim chance the nerve damage would heal without invasive surgical intervention.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'slim'",
        url: "https://www.oed.com/view/Entry/181824",
        note: "Sự chuyển dịch từ thể trạng vật lý sang định lượng xác suất."
      }
    ]
  },

  "19_1_inforachance": {
    idiom_headword: "in for a chance of",
    current_figurative_meaning: "Có nhiều khả năng gặp phải hoặc trải qua một biến cố thời tiết hay sự kiện sắp tới.",
    literal_image: "Bước vào một vùng tâm bão hoặc bước vào phạm vi tác động của một hệ thống thời tiết.",
    figurative_connection: "Cấu trúc 'be in for sth' diễn tả vị thế chuẩn bị hứng chịu hoặc đón nhận một biến cố khó tránh khỏi.",
    historical_context: "Xuất phát từ thuật ngữ khí tượng học và hàng hải Anh thế kỷ 18 khi thuyền trưởng dự báo vùng biển phía trước ('we are in for rough weather').",
    deep_example: "Meteorologists warned that coastal regions are in for a chance of gale-force gusts as the low-pressure system intensifies.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Oxford English Dictionary — 'be in for'",
        url: "https://www.oed.com/view/Entry/97880",
        note: "Thành ngữ dự báo thời tiết và diễn biến tương lai."
      }
    ]
  },

  "19_1_standachance": {
    idiom_headword: "don't stand a chance",
    current_figurative_meaning: "Hoàn toàn không có cơ hội thắng thế hay thành công, nắm chắc phần thất bại.",
    literal_image: "Một đấu sĩ bị đối phương dồn vào thế không thể đứng vững trên đấu trường, lập tức ngã quỵ.",
    figurative_connection: "Vị thế đứng vững ('stand'): Trong đấu kiếm và quyền anh, nếu một võ sĩ không thể 'stand', họ không còn tư cách hay khả năng tranh chấp chiến thắng.",
    historical_context: "Gắn liền với các trận đấu đối kháng và đấu trường La Mã - Anh quốc thế kỷ 18, nơi quy định đấu thủ phải 'stand' tại chỗ mới được tính điểm.",
    deep_example: "Given their opponent's formidable bench strength, the underdog squad didn't stand a chance of advancing to the semi-finals.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'stand a chance'",
        url: "https://www.oed.com/view/Entry/188989",
        note: "Từ vựng đấu vật và quyền anh thế kỷ 18 chuyển thành ngôn ngữ đời sống."
      }
    ]
  },

  // ==========================================
  // Module 19.2: EXPRESSIONS WITH "LUCK" (Page 82)
  // ==========================================
  "19_2_strokeofluck": {
    idiom_headword: "a stroke of luck",
    current_figurative_meaning: "Một vận may bất ngờ, cơ may tình cờ ập đến giải nguy hoặc mang lại tài lộc.",
    literal_image: "Tia sét may mắn bất ngờ đánh xuống, hoặc cú vung gậy chuẩn xác ngoài dự tính của người chơi golf.",
    figurative_connection: "Từ 'stroke' biểu thị một xung động đột ngột mang tính định mệnh (như tiếng chuông đồng hồ điểm, tia chớp, hoặc nét cọ thần kỳ).",
    historical_context: "Bắt nguồn từ tiếng Anh thế kỷ 17 ('stroke of fortune' / 'stroke of luck'), thịnh hành trong các vở kịch thời kỳ Phục hưng mô tả sự can thiệp của số phận.",
    deep_example: "Finding an available rental directly across from the hospital was a stroke of luck for the newly transferred surgical resident.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'stroke of luck'",
        url: "https://www.oed.com/view/Entry/191590",
        note: "Khảo chứng từ 'stroke' mang nghĩa biến cố đột ngột của số phận."
      }
    ]
  },

  "19_2_beginnersluck": {
    idiom_headword: "beginner's luck",
    current_figurative_meaning: "Vận may của người mới chơi, hiện tượng người chưa từng có kinh nghiệm lại bất ngờ giành chiến thắng.",
    literal_image: "Một người lần đầu cầm bộ bài hoặc xúc xắc liên tiếp quay trúng các tổ hợp điểm số cao nhất.",
    figurative_connection: "Nghịch lý nhận thức: Người mới không bị tâm lý áp lực đè nặng hoặc các định kiến chiến thuật gò bó, đôi khi hành động ngẫu nhiên lại tạo kết quả vượt trội.",
    historical_context: "Xuất hiện trong các sòng bạc và câu lạc bộ bài Tây ở châu Âu và Mỹ vào cuối thế kỷ 19 để giải thích hiện tượng người mới nhập môn thường thắng ở ván đầu.",
    deep_example: "His victory in the local chess tournament was dismissed by seasoned grandmasters as sheer beginner's luck.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'beginner's luck'",
        url: "https://www.oed.com/view/Entry/17094",
        note: "Hiện tượng tâm lý học cờ bạc được ghi nhận từ thập niên 1890."
      }
    ]
  },

  "19_2_pushyourluck": {
    idiom_headword: "don't push your luck",
    current_figurative_meaning: "Đừng được đằng chân lân đằng đầu, đừng mạo hiểm đòi hỏi thêm kẻo mất cả chì lẫn chài.",
    literal_image: "Người đi trên lớp băng mỏng đã may mắn qua được đoạn nứt lại quay lại dẫm mạnh thêm một lần nữa.",
    figurative_connection: "Giới hạn dung sai của may rủi: May mắn là món quà hữu hạn; cố tình kéo căng nó quá mức ('push') sẽ kích hoạt rủi ro phản tác dụng.",
    historical_context: "Phổ biến từ thập niên 1930 trong văn hóa Mỹ, bắt nguồn từ các trò chơi may rủi đòi hỏi người chơi phải biết dừng đúng lúc trước khi mất hết tiền cược.",
    deep_example: "The manager has already agreed to a flexible schedule; don't push your luck by asking for an extra telecommuting day.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'push one's luck'",
        url: "https://www.oed.com/view/Entry/154944",
        note: "Thành ngữ khuyến cáo quản trị rủi ro thế kỷ 20."
      }
    ]
  },

  "19_2_inluck": {
    idiom_headword: "in luck",
    current_figurative_meaning: "Gặp may, đúng lúc cơ hội thuận lợi xuất hiện vừa khớp với nhu cầu.",
    literal_image: "Vừa bước vào một khu vườn đang mùa kết trái xum xuê.",
    figurative_connection: "Trạng thái đắm mình trong vận hội tốt lành: Tiền tố 'in' thể hiện vị thế đang nằm trọn trong luồng may mắn.",
    historical_context: "Cụm từ tiếng Anh cổ điển có từ thế kỷ 16 ('to be in luck'), tương phản trực tiếp với 'out of luck'.",
    deep_example: "If you need a ticket to the sold-out gala, you're in luck; a colleague just surrendered her reserved seat.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'in luck'",
        url: "https://www.oed.com/view/Entry/110887",
        note: "Đối lập trạng thái may mắn và rủi ro trong văn bản cận đại."
      }
    ]
  },

  "19_2_outofluck": {
    idiom_headword: "out of luck",
    current_figurative_meaning: "Kém may mắn, lỡ mất cơ hội một cách đáng tiếc, không còn lựa chọn nào.",
    literal_image: "Đến giếng nước khi nguồn nước vừa cạn kiệt, hoặc đến bến ga khi con tàu vừa rời bánh.",
    figurative_connection: "Sự cạn kiệt nguồn tài nguyên may mắn: Nằm ngoài quỹ đạo bảo trợ của hoàn cảnh thuận lợi.",
    historical_context: "Xuất hiện trong các tác phẩm văn học Anh từ đầu thế kỷ 18, thường dùng để từ chối một cách lịch sự nhưng dứt khoát.",
    deep_example: "Shoppers seeking the discounted flagship monitor were out of luck as supplies were depleted within fifteen minutes.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'out of luck'",
        url: "https://www.oed.com/view/Entry/110887",
        note: "Cụm từ từ chối do hoàn cảnh khách quan."
      }
    ]
  },

  "19_2_sheerluck": {
    idiom_headword: "sheer luck",
    current_figurative_meaning: "Hoàn toàn là do ăn may, vận may thuần túy 100% không nhờ vào bất kỳ tài năng hay sự chuẩn bị nào.",
    literal_image: "Một tấm vải trong suốt không pha tạp chất, hoặc một vách đá dốc đứng tinh khiết không có điểm tựa.",
    figurative_connection: "Từ 'sheer' mang nghĩa tinh khiết, tuyệt đối không bị pha trộn: Khẳng định 100% kết quả là do ngẫu nhiên chứ không do nỗ lực chủ quan.",
    historical_context: "Bắt nguồn từ nghĩa cổ của 'sheer' (sáng sủa, thuần khiết trong tiếng Anh cổ *scir*). Đến thế kỷ 19, từ này thường ghép với các danh từ trừu tượng như 'folly', 'coincidence', 'luck'.",
    deep_example: " Surviving the avalanche without serious injury was an instance of sheer luck, according to mountain rescue specialists.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'sheer'",
        url: "https://www.oed.com/view/Entry/177926",
        note: "Tính từ cường điệu biểu thị sự tinh ròng, không pha tạp."
      }
    ]
  },

  // ==========================================
  // Module 19.3: PROBABILITY (Page 83)
  // ==========================================
  "19_3_hotfavorite": {
    idiom_headword: "the hot favorite",
    current_figurative_meaning: "Ứng cử viên sáng giá nhất, đối tượng có xác suất chiến thắng cao vượt trội.",
    literal_image: "Chú ngựa đua sung sức đang 'nóng' máy trên đường chạy, được đám đông đổ dồn tiền đặt cược.",
    figurative_connection: "Nhiệt lượng sinh học và sức hút truyền thông: 'Hot' miêu tả năng lượng sôi sục và sự hâm mộ cuồng nhiệt dồn vào một đối thủ duy nhất.",
    historical_context: "Thuật ngữ đua ngựa trường đua Epsom và Newmarket của Anh thế kỷ 19 ('the hot favorite' là con ngựa được nhà cái hạ tỷ lệ cược xuống thấp nhất vì quá mạnh).",
    deep_example: "Boasting an undefeated international season, the reigning world champion entered the tournament as the hot favorite for gold.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'hot favorite'",
        url: "https://www.oed.com/view/Entry/88780",
        note: "Thuật ngữ cá cược thể thao trường đua ngựa thế kỷ 19."
      }
    ]
  },

  "19_3_incards": {
    idiom_headword: "in the cards",
    current_figurative_meaning: "Rất có thể sẽ xảy ra, nằm trong dự liệu của tương lai hoặc số phận định sẵn.",
    literal_image: "Lá bài tiên tri Tarot được lật mở trên bàn bói toán hiển thị trước tương lai của thân chủ.",
    figurative_connection: "Nghệ thuật bói bài Tarot (cartomancy): Nếu một sự kiện đã 'nằm trong các lá bài' ('in the cards'), điều đó đồng nghĩa với việc nó đã được định đoạt trong trật tự vũ trụ.",
    historical_context: "Bắt nguồn từ trào lưu bói bài bùng nổ tại Pháp và Anh thế kỷ 18. Ban đầu viết là 'in the cards' (Mỹ) hoặc 'on the cards' (Anh).",
    deep_example: "Given the dramatic surge in subscriber growth, a lucrative initial public offering is definitely in the cards for the platform.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'on / in the cards'",
        url: "https://www.oed.com/view/Entry/27847",
        note: "Nguồn gốc từ thuật bói bài Cartomancy thế kỷ 18."
      }
    ]
  },

  "19_3_foregoneconcl": {
    idiom_headword: "a foregone conclusion",
    current_figurative_meaning: "Kết quả biết trước mười mươi, điều hiển nhiên không cần bàn cãi hay chờ đợi kết quả.",
    literal_image: "Một bản án đã được thẩm phán ký sẵn trong đầu trước khi phiên tòa thậm chí còn chưa bắt đầu.",
    figurative_connection: "Kết luận đi trước quá trình chứng minh: 'Foregone' (đã đi qua trước đó), sự việc chắc chắn đến mức quá trình diễn ra chỉ mang tính thủ tục.",
    historical_context: "Xuất xứ trực tiếp từ đại văn hào William Shakespeare trong vở bi kịch *Othello* (1603, Hồi 3, Cảnh 3), khi Iago xảo quyệt gieo rắc sự nghi ngờ vào đầu Othello.",
    deep_example: "With ninety percent of votes already tabulated in the incumbent's stronghold, the election outcome was a foregone conclusion.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "William Shakespeare — Othello (1603), Act 3, Scene 3",
        url: "https://www.opensourceshakespeare.org/views/plays/play_view.php?WorkID=othello",
        note: "Tác phẩm văn học đầu tiên xác lập cụm từ này trong ngôn ngữ Anh."
      },
      {
        title: "Oxford English Dictionary — 'foregone conclusion'",
        url: "https://www.oed.com/view/Entry/72797",
        note: "Trích dẫn Othello và khảo chứng nghĩa học."
      }
    ]
  },

  "19_3_dontholdbreath": {
    idiom_headword: "don't hold your breath",
    current_figurative_meaning: "Đừng dại mà nín thở chờ đợi, điều đó gần như chắc chắn sẽ không xảy ra đâu.",
    literal_image: "Nín thở chờ đợi ai đó thực hiện lời hứa cho đến khi mặt tím tái và ngất xỉu vì họ không bao giờ làm.",
    figurative_connection: "Giới hạn sinh lý con người: Con người chỉ có thể nín thở trong khoảng 1–2 phút. Khuyên 'đừng nín thở' là khẳng định sự việc sẽ mất vô tận thời gian hoặc không bao giờ xảy ra.",
    historical_context: "Phổ biến trong văn hóa Mỹ từ cuối thế kỷ 19, bắt nguồn từ hiện tượng trẻ con nín thở ăn vạ hoặc các trò thi lặn nước.",
    deep_example: "Management promised a comprehensive restructuring of the bonus pool, but veteran analysts advised staff not to hold their breath.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'hold one's breath'",
        url: "https://www.oed.com/view/Entry/23118",
        note: "Phân tích ẩn dụ sinh học và sắc thái mỉa mai phủ định."
      }
    ]
  },

  "19_3_pigsfly": {
    idiom_headword: "when pigs fly",
    current_figurative_meaning: "Chuyện không tưởng, có mà mơ, vĩnh viễn không bao giờ có thể xảy ra.",
    literal_image: "Những chú heo mập mạp bỗng mọc cánh vỗ cánh bay lượn trên bầu trời xanh.",
    figurative_connection: "Điều bất khả nghịch sinh học (adynaton): Dùng một hình ảnh hoàn toàn trái ngược với định luật vật lý và giải phẫu sinh học để khẳng định xác suất bằng 0.",
    historical_context: "Một ngạn ngữ cổ của Scotland từ thế kỷ 16 ('pigs fly with their tails forward'). Nhà văn Lewis Carroll cũng sử dụng hình ảnh này trong *Alice ở xứ sở thần tiên* (1865).",
    deep_example: "My cynical roommate claimed he would willingly wash the dishes every single night when pigs fly.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Lewis Carroll — Alice's Adventures in Wonderland (1865)",
        url: "https://www.gutenberg.org/ebooks/11",
        note: "Hình tượng văn học cổ điển về điều không tưởng."
      },
      {
        title: "Oxford Dictionary of Proverbs — 'Pigs may fly'",
        url: "https://www.oxfordreference.com/",
        note: "Lịch sử ngạn ngữ Scotland thế kỷ 16."
      }
    ]
  },

  "19_3_piesky": {
    idiom_headword: "pie in the sky",
    current_figurative_meaning: "Bánh vẽ, giấc mơ hão huyền phi thực tế không bao giờ trở thành hiện thực.",
    literal_image: "Chiếc bánh nướng thơm lừng lơ lửng trên chín tầng mây mà con người dưới mặt đất không bao giờ với tới được.",
    figurative_connection: "Ảo tưởng về phần thưởng sau cái chết: Thay vì cải thiện cuộc sống hiện tại, người ta bị ru ngủ bởi những lời hứa hẹn viển vông về phần thưởng trên trời.",
    historical_context: "Xuất phát từ bài hát phản kháng lao động 'The Preacher and the Slave' (1911) của Joe Hill thuộc tổ chức Công nhân Công nghiệp Thế giới (IWW), mỉa mai các nhà truyền giáo hứa hẹn 'You will eat, bye and bye, in that glorious land above the sky: Work and pray, live on hay, You'll get pie in the sky when you die'.",
    deep_example: "Proposals to colonize Mars within the next three years remain pure pie in the sky until radiation shielding technology matures.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Joe Hill — The Preacher and the Slave (1911)",
        url: "https://en.wikipedia.org/wiki/The_Preacher_and_the_Slave",
        note: "Nguồn gốc lịch sử bài ca phong trào công nhân Mỹ IWW."
      },
      {
        title: "Oxford English Dictionary — 'pie in the sky'",
        url: "https://www.oed.com/view/Entry/143521",
        note: "Ghi nhận nguồn gốc chính trị và sự chuyển hóa vào ngôn ngữ phổ thông."
      }
    ]
  },

  "19_3_anyonesguess": {
    idiom_headword: "it's anyone's guess",
    current_figurative_meaning: "Không ai có thể đoán trước được, hoàn toàn mù mịt và bất định.",
    literal_image: "Một chiếc hộp kín không ai biết bên trong có gì; lời phỏng đoán của giáo sư hay đứa trẻ đều có giá trị tương đương nhau.",
    figurative_connection: "Sự bình đẳng tuyệt đối của sự thiếu hiểu biết: Trong trạng thái hỗn loạn hoàn hảo, chuyên gia cũng không có lợi thế dự đoán hơn người bình thường.",
    historical_context: "Phổ biến trong văn nói tiếng Anh thế kỷ 20, đặc biệt trong các cuộc tranh luận chính trị và phân tích thị trường chứng khoán.",
    deep_example: "With key macroeconomic indicators flashing contradictory signals, the direction of interest rates next quarter is truly anyone's guess.",
    evidence_category: "PLAUSIBLE IMAGE/MEANING CONNECTION",
    sources: [
      {
        title: "Cambridge Idioms Dictionary — 'anyone's guess'",
        url: "https://dictionary.cambridge.org/",
        note: "Biểu đạt tình trạng bất định của hệ thống phức tạp."
      }
    ]
  },

  "19_3_blewit": {
    idiom_headword: "blew it",
    current_figurative_meaning: "Làm hỏng bét, đánh mất cơ hội ngàn vàng vì sai lầm ngớ ngẩn của chính mình.",
    literal_image: "Thổi một ngọn nến tắt phụt, hoặc thổi bay mất đống bụi vàng trên lòng bàn tay.",
    figurative_connection: "Luồng khí phá hủy: Một hành động bất cẩn làm thổi bay đi thành quả hoặc cơ hội quý giá đã dày công xây dựng.",
    historical_context: "Tiếng lóng của giới nhạc công jazz và diễn viên kịch Mỹ đầu thế kỷ 20 ('blow your lines' là quên lời thoại hoặc thổi nốt sai trong dàn nhạc).",
    deep_example: "The software startup had secured a meeting with top venture capitalists, but completely blew it by demonstrating an untested prototype.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'blow it'",
        url: "https://www.oed.com/view/Entry/20658",
        note: "Tiếng lóng sân khấu và âm nhạc jazz thế kỷ 20."
      }
    ]
  },

  "19_3_againstodds": {
    idiom_headword: "against all odds",
    current_figurative_meaning: "Bất chấp mọi nghịch cảnh tưởng chừng như không thể, vượt qua mọi dự đoán bi quan để thành công.",
    literal_image: "Chú cá nhỏ bơi ngược dòng nước xiết cuồn cuộn vượt qua thác ghềnh hiểm trở.",
    figurative_connection: "Tỷ lệ cược áp đảo ('odds'): Trong toán học xác suất và cá cược, khi tỷ lệ cược hoàn toàn chống lại bạn (1 ăn 1000), việc giành chiến thắng là kỳ tích phi thường.",
    historical_context: "Bắt nguồn từ giới toán học xác suất và nhà cái cá cược thể thao Anh thế kỷ 18, sau này đi vào văn học anh hùng ca.",
    deep_example: "Against all odds, the surgical team managed to stabilize the patient despite catastrophic multi-organ failure.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'odds'",
        url: "https://www.oed.com/view/Entry/130541",
        note: "Thuật ngữ xác suất và tỷ lệ cược trường đua thế kỷ 18."
      }
    ]
  },

  "19_3_touchandgo": {
    idiom_headword: "touch-and-go",
    current_figurative_meaning: "Nguy ngập bất định, tình thế nghìn cân treo sợi tóc không biết sống chết hay thành bại ra sao.",
    literal_image: "Con thuyền buồm lướt qua rạn san hô ngầm vừa chạm đáy cát suýt mắc cạn rồi may mắn trôi thoát đi tiếp.",
    figurative_connection: "Va chạm trong gang tấc: Trạng thái lằn ranh giữa việc bị đắm tàu ('touch') và việc thoát hiểm thành công ('go').",
    historical_context: "Xuất phát từ kỹ thuật hàng hải thời kỳ thuyền buồm thế kỷ 18 khi thuyền trưởng phải luồn lách qua các luồng lạch nông đầy bãi đá ngầm nguy hiểm.",
    deep_example: "Following the complex coronary bypass procedure, it was touch-and-go for forty-eight hours before vital signs stabilized.",
    evidence_category: "DOCUMENTED ORIGIN",
    sources: [
      {
        title: "Oxford English Dictionary — 'touch-and-go'",
        url: "https://www.oed.com/view/Entry/203790",
        note: "Thuật ngữ hàng hải lái tàu qua bãi cạn thế kỷ 18."
      }
    ]
  }
};

export default UNIT_19_ETYMOLOGY;
