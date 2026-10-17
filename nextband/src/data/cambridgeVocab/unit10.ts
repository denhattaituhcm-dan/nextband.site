import { CambridgeUnitData } from "./types";

export const unit10Data: CambridgeUnitData = {
  meta: {
    unit: 10,
    title: "REACHING FOR THE SKIES: SPACE EXPLORATION & COSMOLOGY",
    subTitle: "Thám hiểm không gian, Công nghệ vệ tinh & Vũ trụ học",
    book: "Cambridge Vocabulary for IELTS - Unit 10 (Space)",
    cefr: "B2 - C1 (IELTS 6.5 - 8.5)",
    totalStages: 3,
    speedGoalWpm: 45,
    paperSpeedMultiplier: "7.0x"
  },
  stage1_magnets: [
    {
      id: "s1_u10_m1",
      sentenceBefore: "Equipped with high-precision synthetic aperture radar, the Earth-observation satellite was engineered to",
      sentenceAfter: "the planet at an altitude of approximately 600 kilometers to record oceanic warming.",
      target: "orbit",
      options: [
        {
          word: "orbit",
          pos: "v.",
          hint: "Bay quanh một thiên thể theo một quỹ đạo xác định chịu tác động của trọng lực.",
          explanation: "Chính xác! Ngoại động từ 'orbit the planet/Earth' (bay quanh quỹ đạo Trái Đất/hành tinh) là thuật ngữ hàng không vũ trụ chuẩn mực."
        },
        {
          word: "rotate",
          pos: "v.",
          hint: "Tự xoay tròn xung quanh trục nội tại của chính bản thân vật thể.",
          explanation: "'rotate' là tự quay quanh trục của chính mình (ví dụ: the Earth rotates on its axis once every 24 hours), không dùng để chỉ việc vệ tinh bay quanh thiên thể khác."
        },
        {
          word: "revolve",
          pos: "v.",
          hint: "Quay xung quanh một điểm hoặc trục trung tâm, thường đòi hỏi giới từ 'around'.",
          explanation: "'revolve' thường đi kèm giới từ 'around' (revolve around the Sun), nhưng trong văn cảnh kỹ thuật vệ tinh, ngoại động từ 'orbit the planet' chính xác và tự nhiên hơn."
        }
      ],
      ieltsInsight: {
        collocation: "orbit the Earth / in low Earth orbit / geostationary orbit",
        bandScore: "Band 7.5+",
        synonyms: ["circle the planet", "traverse a trajectory", "maintain orbital path"],
        academicTip: "Phân biệt rõ: Trái Đất 'rotates on its axis' (tự quay quanh trục), 'revolves around the Sun' (quay quanh Mặt Trời), và vệ tinh 'orbits the Earth'."
      }
    },
    {
      id: "s1_u10_m2",
      sentenceBefore: "Astrobiologists analyzing chemical samples gathered from subterranean Martian caves are searching for definitive signatures of",
      sentenceAfter: "life beyond our home planet.",
      target: "extraterrestrial",
      options: [
        {
          word: "terrestrial",
          pos: "adj.",
          hint: "Thuộc về Trái Đất hoặc động vật sinh sống trên cạn.",
          explanation: "'terrestrial' có nghĩa là thuộc về Trái Đất (terrestrial ecosystems) hoặc sống trên cạn, trái ngược với mục tiêu tìm kiếm ngoài không gian."
        },
        {
          word: "celestial",
          pos: "adj.",
          hint: "Thuộc về bầu trời, các vì sao hoặc thiên thể vũ trụ nói chung.",
          explanation: "'celestial' dùng để mô tả thiên thể như ngôi sao, mặt trời, hành tinh (celestial bodies), không dùng để định nghĩa dạng sinh vật sống ngoài Trái Đất."
        },
        {
          word: "extraterrestrial",
          pos: "adj.",
          hint: "Tồn tại hoặc có nguồn gốc bên ngoài Trái Đất và bầu khí quyển của nó.",
          explanation: "Chính xác! 'extraterrestrial life' (sự sống ngoài Trái Đất) là thuật ngữ khoa học tiêu chuẩn khi bàn về việc tìm kiếm sinh vật ngoài vũ trụ."
        }
      ],
      ieltsInsight: {
        collocation: "extraterrestrial life / search for extraterrestrial intelligence (SETI) / extraterrestrial origin",
        bandScore: "Band 8.0",
        synonyms: ["alien life", "non-terrestrial organisms", "interstellar biological entities"],
        academicTip: "Dùng cụm từ 'extraterrestrial life' hoặc 'extraterrestrial entities' thay thế cho từ ngữ thông tục 'aliens' trong văn cảnh học thuật IELTS Writing."
      }
    },
    {
      id: "s1_u10_m3",
      sentenceBefore: "Prolonged exposure to the physiological condition of",
      sentenceAfter: "inside the space station causes severe loss of skeletal calcium and muscular atrophy.",
      target: "weightlessness",
      options: [
        {
          word: "gravity",
          pos: "n.",
          hint: "Lực hấp dẫn kéo các vật thể về phía tâm hành tinh.",
          explanation: "'gravity' là lực hút trọng trường thông thường; môi trường bên trong trạm không gian là nơi vi trọng lực / mất trọng lực, chính điều đó mới gây teo cơ."
        },
        {
          word: "weightlessness",
          pos: "n.",
          hint: "Trạng thái không trọng lượng do các lực hấp dẫn bị triệt tiêu trong quỹ đạo rơi tự do.",
          explanation: "Chính xác! 'condition of weightlessness' (trạng thái không trọng lượng / vi trọng lượng) là nguyên nhân gây suy giảm mật độ xương và teo cơ ở phi hành gia."
        },
        {
          word: "levitation",
          pos: "n.",
          hint: "Hiện tượng bay lơ lửng bằng ảo thuật, năng lực siêu nhiên hoặc huyền học.",
          explanation: "'levitation' thuộc về ảo thuật hoặc hiện tượng siêu nhiên kỳ bí, không phải thuật ngữ y học hàng không vũ trụ."
        }
      ],
      ieltsInsight: {
        collocation: "condition of weightlessness / experience weightlessness / zero gravity simulation",
        bandScore: "Band 8.0",
        synonyms: ["microgravity environment", "zero-g condition", "absence of gravitational pull"],
        academicTip: "Trong bài viết Task 2 về du hành không gian, cụm 'physiological repercussions of prolonged weightlessness' là đòn bẩy ghi điểm Band 8+ vượt trội."
      }
    },
    {
      id: "s1_u10_m4",
      sentenceBefore: "The catastrophic fragmentation of obsolete satellites has saturated low Earth orbit with lethal space",
      sentenceAfter: "moving at hypervelocity speeds capable of penetrating spacecraft hulls.",
      target: "debris",
      options: [
        {
          word: "debris",
          pos: "n.",
          hint: "Mảnh vụn vỡ, phế liệu trôi nổi trên quỹ đạo sau các vụ nổ hoặc va chạm trong không gian.",
          explanation: "Chính xác! 'space debris / orbital debris' (rác vũ trụ, mảnh vụn quỹ đạo) là thuật ngữ học thuật chỉ phế phẩm vệ tinh bay với vận tốc cực lớn quanh Trái Đất."
        },
        {
          word: "wreckage",
          pos: "n.",
          hint: "Xác đổ nát của máy bay, tàu thủy hoặc xe cộ sau các vụ tai nạn thảm khốc.",
          explanation: "'wreckage' thường chỉ xác vỏ xe cộ hoặc đống hoang tàn lớn của máy bay rơi dưới mặt đất (plane wreckage), không dùng cho các mảnh rác li ti trên quỹ đạo vũ trụ."
        },
        {
          word: "litter",
          pos: "n.",
          hint: "Rác thải sinh hoạt do con người vứt bừa bãi tại các khu vực công cộng ngoài phố.",
          explanation: "'litter' chỉ rác sinh hoạt như túi nilon, vỏ lon nước ngọt bị xả nơi công cộng, không thích hợp cho môi trường quỹ đạo hàng không vũ trụ."
        }
      ],
      ieltsInsight: {
        collocation: "space debris / orbital debris / accumulation of debris / tracking space debris",
        bandScore: "Band 8.0",
        synonyms: ["space junk", "orbital fragments", "hypervelocity space detritus"],
        academicTip: "Nhớ rằng 'debris' là danh từ không đếm được và phát âm chữ 's' câm (/ˈdeb.riː/). Luôn dùng 'space debris' khi phân tích rủi ro của kỷ nguyên vệ tinh chùm."
      }
    },
    {
      id: "s1_u10_m5",
      sentenceBefore: "While scientific deep-space",
      sentenceAfter: "broadens human knowledge, ethicists question whether the commercial extraction of off-world minerals should be permitted.",
      target: "exploration",
      options: [
        {
          word: "exploitation",
          pos: "n.",
          hint: "Sự khai thác tài nguyên vì mục đích trục lợi hoặc thương mại.",
          explanation: "'exploitation' mang nghĩa khai thác thương mại, vắt kiệt tài nguyên (resource exploitation), hoàn toàn đối lập với tinh thần thám hiểm khoa học thuần túy trong câu."
        },
        {
          word: "expedition",
          pos: "n.",
          hint: "Chuyến du hành khám phá cụ thể của một nhóm người đến một vùng đất xa xôi.",
          explanation: "'expedition' là chuyến thám hiểm cụ thể có điểm đến (a polar expedition), không mang tính khái quát trừu tượng của toàn bộ ngành khoa học thám hiểm không gian."
        },
        {
          word: "exploration",
          pos: "n.",
          hint: "Hành động thám hiểm, nghiên cứu khám phá những miền đất hoặc vũ trụ chưa biết.",
          explanation: "Chính xác! 'space exploration' (ngành thám hiểm không gian) là khái niệm chỉ công cuộc nghiên cứu vũ trụ phục vụ tiến bộ tri thức nhân loại."
        }
      ],
      ieltsInsight: {
        collocation: "space exploration / planetary exploration / deep-space exploration",
        bandScore: "Band 7.5+",
        synonyms: ["cosmic inquiry", "interstellar reconnaissance", "scientific extraterrestrial discovery"],
        academicTip: "Đặt cặp từ 'space exploration' (thám hiểm khoa học) tương phản với 'commercial exploitation' (khai thác thương mại) là chiến thuật lập luận phản biện kinh điển trong Task 2."
      }
    },
    {
      id: "s1_u10_m6",
      sentenceBefore: "Next-generation ion engines generate continuous, fuel-efficient thrust to",
      sentenceAfter: "unmanned scientific probes toward distant outer gas giants.",
      target: "propel",
      options: [
        {
          word: "launch",
          pos: "v.",
          hint: "Phóng một tên lửa hoặc vệ tinh từ bệ phóng dưới mặt đất lên không gian.",
          explanation: "'launch' chỉ khoảnh khắc điểm hỏa phóng tên lửa từ mặt đất (launch a rocket), không dùng để mô tả lực đẩy duy trì vận tốc liên tục giữa các hành tinh."
        },
        {
          word: "catapult",
          pos: "v.",
          hint: "Bắn vụt đi bằng máy phóng cơ học hoặc đẩy bất thình lình trong nháy mắt.",
          explanation: "'catapult' mô tả cú phóng vụt giật cục trong chốc lát, không áp dụng cho cơ chế đẩy bằng ion êm ái và kéo dài hàng năm trời."
        },
        {
          word: "propel",
          pos: "v.",
          hint: "Đẩy tiến về phía trước bằng phản lực hoặc lực đẩy cơ học liên tục.",
          explanation: "Chính xác! 'propel a probe/spacecraft' (đẩy tàu thăm dò tiến về phía trước) là động từ kỹ thuật chính xác nhất chỉ lực đẩy động cơ phản lực."
        }
      ],
      ieltsInsight: {
        collocation: "propel a spacecraft / rocket propulsion / propelled by ion thrusters",
        bandScore: "Band 8.0",
        synonyms: ["thrust forward", "drive onwards", "accelerate trajectory"],
        academicTip: "Danh từ 'propulsion' (hệ thống phản lực đẩy: rocket propulsion) là từ vựng Band 8+ chủ đạo khi miêu tả công nghệ du hành liên hành tinh."
      }
    },
    {
      id: "s1_u10_m7",
      sentenceBefore: "The primary objective of the Artemis program is to establish an inhabited outpost near water-ice deposits at the south",
      sentenceAfter: "pole before attempting manned expeditions to Mars.",
      target: "lunar",
      options: [
        {
          word: "lunar",
          pos: "adj.",
          hint: "Thuộc về Mặt Trăng hoặc liên quan đến Mặt Trăng.",
          explanation: "Chính xác! 'lunar pole / lunar surface / lunar outpost' (cực Mặt Trăng / căn cứ Mặt Trăng) là thuật ngữ chính xác của chương trình Artemis do NASA dẫn dắt."
        },
        {
          word: "solar",
          pos: "adj.",
          hint: "Thuộc về Mặt Trời hoặc năng lượng mặt trời.",
          explanation: "'solar' liên quan đến Mặt Trời (solar flare, solar radiation), không phù hợp với mục tiêu đổ bộ và khai thác băng nước trên bề mặt Mặt Trăng."
        },
        {
          word: "stellar",
          pos: "adj.",
          hint: "Thuộc về các vì sao tinh tú, hoặc xuất sắc xuất chúng.",
          explanation: "'stellar' mô tả các ngôi sao (stellar evolution) hoặc nghĩa bóng là xuất sắc, không dùng để chỉ địa hình bề mặt của Mặt Trăng."
        }
      ],
      ieltsInsight: {
        collocation: "lunar surface / lunar landing / lunar outpost / lunar eclipse",
        bandScore: "Band 7.5+",
        synonyms: ["Moon-based", "selenological", "Moon's polar terrain"],
        academicTip: "Ghi nhớ bộ tính từ gốc La-tinh chủ đạo: 'lunar' (Mặt Trăng), 'solar' (Mặt Trời), 'terrestrial' (Trái Đất), 'stellar' (Các vì sao)."
      }
    },
    {
      id: "s1_u10_m8",
      sentenceBefore: "Extravehicular spacesuits must be pressurized to protect astronauts against the extreme temperature swings and absolute atmospheric",
      sentenceAfter: "of deep cosmic space.",
      target: "vacuum",
      options: [
        {
          word: "void",
          pos: "n.",
          hint: "Khoảng không trống rỗng, vô định hoặc sự trống vắng vô tận trong tâm hồn.",
          explanation: "'void' mang sắc thái văn học hoặc triết học miêu tả sự hư vô trống rỗng, không phải danh từ khoa học vật lý chỉ môi trường có áp suất bằng không."
        },
        {
          word: "vacuum",
          pos: "n.",
          hint: "Môi trường chân không hoàn toàn không có không khí, khí thể hay áp suất quyển.",
          explanation: "Chính xác! 'vacuum of space' (môi trường chân không vũ trụ) là thuật ngữ vật lý chính xác chỉ không gian không có hạt khí quyển."
        },
        {
          word: "abyss",
          pos: "n.",
          hint: "Vực thẳm sâu không thấy đáy hoặc vực sâu hun hút dưới đáy đại dương.",
          explanation: "'abyss' chỉ hố sâu hun hút dưới biển hoặc vực thẳm tâm lý, không dùng cho môi trường không trọng lực và không khí của vũ trụ."
        }
      ],
      ieltsInsight: {
        collocation: "the vacuum of space / near-perfect vacuum / survive in a vacuum",
        bandScore: "Band 8.0",
        synonyms: ["airless expanse", "atmospheric absence", "spatial vacuum"],
        academicTip: "Cụm từ 'in the cold vacuum of space' là miêu tả đắt giá trong các bài viết về sự khắc nghiệt của môi trường ngoài khí quyển Trái Đất."
      }
    }
  ],
  stage2_timeline: [
    {
      milestoneId: "u10_t1",
      age: "Năm 1957",
      title: "Sputnik 1 & Bình Minh Kỷ Nguyên Không Gian",
      icon: "radio",
      stageTag: "Dawn of the Space Age",
      story: "Liên Xô phóng thành công Sputnik 1, quả cầu kim loại phát tín hiệu vô tuyến trở thành [BLANK] nhân tạo đầu tiên trong lịch sử nhân loại bay quanh Trái Đất.",
      storyEn: "The Soviet Union heralded the Space Age by placing Sputnik 1, the first artificial [BLANK], into low Earth orbit.",
      target: "satellite",
      targetVi: "vệ tinh nhân tạo",
      pos: "noun",
      candidates: ["satellite", "telescope", "meteorite", "submarine"],
      explanation: "'satellite' (vệ tinh) là vật thể quay quanh một hành tinh; Sputnik 1 mở đầu cho toàn bộ cuộc cách mạng viễn thông và giám sát không gian."
    },
    {
      milestoneId: "u10_t2",
      age: "Năm 1961",
      title: "Yuri Gagarin & Chuyến Bay Lịch Sử Của Con Người",
      icon: "globe",
      stageTag: "First Human in Space",
      story: "Phi hành gia Yuri Gagarin trên con tàu Vostok 1 đã làm nên kỳ tích khi trở thành con người đầu tiên [BLANK] quanh Trái Đất trong 108 phút nghẹt thở.",
      storyEn: "Soviet cosmonaut Yuri Gagarin made history aboard Vostok 1, becoming the first human to [BLANK] the Earth.",
      target: "orbit",
      targetVi: "bay theo quỹ đạo",
      pos: "verb",
      candidates: ["orbit", "collide", "demolish", "evacuate"],
      explanation: "'orbit' (bay quanh quỹ đạo) mô tả hành trình di chuyển theo chu kỳ khép kín quanh Trái Đất mà không bị rơi trở lại bầu khí quyển."
    },
    {
      milestoneId: "u10_t3",
      age: "Năm 1969",
      title: "Apollo 11 & Bước Chân Đầu Tiên Trên Mặt Trăng",
      icon: "flag",
      stageTag: "Lunar Landing",
      story: "Neil Armstrong đặt bước chân lịch sử xuống bề mặt [BLANK], thốt lên câu nói bất hủ về một bước tiến khổng lồ của toàn nhân loại.",
      storyEn: "Neil Armstrong made humanity's momentous first footprint on the dusty [BLANK] surface during the Apollo 11 mission.",
      target: "lunar",
      targetVi: "thuộc về Mặt Trăng",
      pos: "adjective",
      candidates: ["lunar", "solar", "oceanic", "volcanic"],
      explanation: "'lunar' (thuộc về Mặt Trăng) là tính từ chỉ mọi yếu tố địa lý, môi trường hoặc sứ mệnh liên quan đến vệ tinh tự nhiên của Trái Đất."
    },
    {
      milestoneId: "u10_t4",
      age: "Năm 1990",
      title: "Kính Viễn Vọng Hubble & Đôi Mắt Nhìn Vào Vũ Trụ",
      icon: "eye",
      stageTag: "Deep Space Imaging",
      story: "Được triển khai ngoài bầu khí quyển làm mờ của Trái Đất, kính viễn vọng Hubble chụp lại những bức ảnh sắc nét kinh ngạc về các [BLANK] xa xôi trong vũ trụ.",
      storyEn: "Positioned above atmospheric distortion, the Hubble telescope captured breathtaking imagery of distant [BLANK] bodies.",
      target: "celestial",
      targetVi: "thuộc về thiên thể/bầu trời",
      pos: "adjective",
      candidates: ["celestial", "terrestrial", "subterranean", "microscopic"],
      explanation: "'celestial' (thuộc về thiên thể, các vì sao trên bầu trời) mô tả các thực thể thiên văn như tinh vân, thiên hà và hành tinh."
    },
    {
      milestoneId: "u10_t5",
      age: "Năm 1998 - 2000",
      title: "Trạm Vũ Trụ Quốc Tế & Phòng Thí Nghiệm Không Trọng Lượng",
      icon: "activity",
      stageTag: "Orbital Laboratory",
      story: "Trạm Không gian Quốc tế (ISS) trở thành biểu tượng hợp tác toàn cầu, nơi các nhà khoa học nghiên cứu sinh học trong điều kiện [BLANK] kéo dài.",
      storyEn: "The International Space Station enabled groundbreaking biological experiments under conditions of prolonged [BLANK].",
      target: "weightlessness",
      targetVi: "tình trạng không trọng lượng",
      pos: "noun",
      candidates: ["weightlessness", "friction", "humidity", "magnetism"],
      explanation: "'weightlessness' (trạng thái không trọng lượng / vi trọng lực) tạo môi trường độc nhất để thử nghiệm tinh thể protein và nghiên cứu cơ thể người."
    },
    {
      milestoneId: "u10_t6",
      age: "Những Năm 2010",
      title: "Hiệu Ứng Kessler & Báo Động Về Rác Không Gian",
      icon: "alert-triangle",
      stageTag: "Orbital Debris Threat",
      story: "Sự gia tăng đột biến của các mảnh [BLANK] không gian từ vệ tinh hỏng và tầng tên lửa cũ đe dọa làm tê liệt các quỹ đạo quanh Trái Đất.",
      storyEn: "The alarming multiplication of orbital [BLANK] heightened concerns about cascading collisions in lower orbital bands.",
      target: "debris",
      targetVi: "mảnh vụn rác vũ trụ",
      pos: "noun",
      candidates: ["debris", "fuel", "cargo", "satellites"],
      explanation: "'debris' (mảnh vỡ phế liệu rác vũ trụ) có thể gây ra Hội chứng Kessler, biến không gian gần Trái Đất thành vùng nguy hiểm không thể bay qua."
    },
    {
      milestoneId: "u10_t7",
      age: "Năm 2021 - Nay",
      title: "Kính Viễn Vọng James Webb & Săn Tìm Dấu Vết Sự Sống",
      icon: "search",
      stageTag: "Search for Biosignatures",
      story: "Kính viễn vọng James Webb phân tích thành phần khí quyển của các ngoại hành tinh nhằm truy tìm bằng chứng về sự sống [BLANK] trong dải ngân hà.",
      storyEn: "The James Webb Space Telescope analyzes exoplanet atmospheres to detect potential biosignatures of [BLANK] life.",
      target: "extraterrestrial",
      targetVi: "ngoài Trái Đất",
      pos: "adjective",
      candidates: ["extraterrestrial", "endangered", "prehistoric", "synthetic"],
      explanation: "'extraterrestrial' (ngoài Trái Đất) là mục tiêu tìm kiếm hàng đầu của sinh học vũ trụ hiện đại nhằm trả lời câu hỏi liệu con người có cô độc trong vũ trụ."
    },
    {
      milestoneId: "u10_t8",
      age: "Tương Lai 2030+",
      title: "Chương Trình Artemis & Giấc Mơ Định Cư Sao Hỏa",
      icon: "compass",
      stageTag: "Interplanetary Colonization",
      story: "Các cơ quan vũ trụ và tập đoàn tư nhân đang chạy đua hướng tới việc [BLANK] Mặt Trăng và Sao Hỏa, biến nhân loại thành loài đa hành tinh.",
      storyEn: "Space agencies and commercial pioneers aim to achieve the permanent [BLANK] of Mars to safeguard the species' long-term future.",
      target: "colonization",
      targetVi: "sự khai hoang/định cư đa hành tinh",
      pos: "noun",
      candidates: ["colonization", "extinction", "pollution", "quarantine"],
      explanation: "'colonization' (sự khai hoang định cư lâu dài) là bước chuyển mình mang tính lịch sử đưa nền văn minh con người vươn ra các hành tinh khác."
    }
  ],
  stage3_essay: {
    title: "Space Exploration Spending vs Earthly Priorities",
    prompt: "Billions of dollars are spent on space exploration every year. Some people believe that this money should be spent on solving immediate problems on Earth, such as poverty, disease, and environmental degradation, while others argue that space research is essential for the future of humanity. Discuss both views and give your own opinion.",
    paragraphs: [
      {
        pIndex: 1,
        type: "Introduction",
        text: "In an era of economic volatility and escalating ecological peril, the colossal capital committed to space missions sparks intense political debate. Sceptics argue that public treasuries ought to prioritize immediate terrestrial hardships, dismissing cosmic ventures as an exorbitant luxury. Conversely, proponents insist that deep-space investigation yields transformative technological breakthroughs and safeguards our long-term survival. I firmly concur that while immediate domestic relief is indispensable, funding space exploration remains a vital investment for the collective preservation of human civilization."
      },
      {
        pIndex: 2,
        type: "Body 1 (Prioritizing Immediate Terrestrial Crises)",
        text: "Critics of space expenditure assert that governments have a moral obligation to mitigate pressing [BLANK_1] crises before looking towards the heavens. Millions of impoverished people across developing regions still lack access to drinkable water, elementary medical care, and food security. From a utilitarian standpoint, allocating [BLANK_2] financial budgets to send robotic rovers to distant asteroids or track hypervelocity orbital [BLANK_3] seems indefensible when localized educational and healthcare systems are chronically underfunded. Consequently, taxpayers often view space ventures as scientific self-indulgence that diverts urgent capital away from planetary conservation and poverty alleviation."
      },
      {
        pIndex: 3,
        type: "Body 2 (Technological Spin-offs & Existential Value of Space)",
        text: "Nevertheless, this short-sighted perspective fails to acknowledge that scientific space [BLANK_4] generates transformative spin-offs that directly alleviate terrestrial suffering. Global climate monitoring, agricultural yield prediction, and disaster management depend entirely on constellations of Earth-observation [BLANK_5] operating from high [BLANK_6] vantage points. Furthermore, engineering advancements originally conceived for rocket [BLANK_7] systems and lightweight heat shields have yielded modern solar panels, water-purification filters, and advanced MRI sensors. In the longer term, prospecting for scarce industrial minerals on nearby [BLANK_8] bodies could avert resource wars on Earth, while conducting medical experiments under conditions of prolonged [BLANK_9] accelerates pharmaceutical breakthroughs."
      },
      {
        pIndex: 4,
        type: "Conclusion & Final Stance",
        text: "In conclusion, while earthly crises demand substantial and consistent budgetary allocations, discontinuing space research would severely cripple scientific innovation. Pursuing interplanetary [BLANK_10] and cosmic inquiry is not a frivolous distraction, but an indispensable prerequisite for securing humanity's scientific, technological, and ecological longevity."
      }
    ],
    blanks: [
      {
        id: "u10_b1",
        num: 1,
        rootWord: "terrestrial",
        category: "Planetary Domain",
        targetForm: "terrestrial",
        grammarClue: "Cần tính từ đứng trước danh từ 'crises' để chỉ các cuộc khủng hoảng trên Trái Đất/mặt đất.",
        variants: [
          { form: "terrestrial", pos: "adj.", label: "terrestrial (Tính từ thuộc về Trái Đất / mặt đất)", isCorrect: true },
          { form: "terrestrially", pos: "adv.", label: "terrestrially (Phó từ trên mặt đất)", isCorrect: false },
          { form: "terrestrialize", pos: "v.", label: "terrestrialize (Động từ địa cầu hóa)", isCorrect: false }
        ]
      },
      {
        id: "u10_b2",
        num: 2,
        rootWord: "astronomy",
        category: "Colossal Scale",
        targetForm: "astronomical",
        grammarClue: "Cần tính từ đứng trước cụm danh từ 'financial budgets' với nghĩa ẩn dụ là kinh phí khổng lồ, thiên văn.",
        variants: [
          { form: "astronomical", pos: "adj.", label: "astronomical (Tính từ khổng lồ / thuộc thiên văn)", isCorrect: true },
          { form: "astronomically", pos: "adv.", label: "astronomically (Phó từ ở mức thiên văn)", isCorrect: false },
          { form: "astronomy", pos: "n.", label: "astronomy (Danh từ thiên văn học)", isCorrect: false }
        ]
      },
      {
        id: "u10_b3",
        num: 3,
        rootWord: "debris",
        category: "Space Junk",
        targetForm: "debris",
        grammarClue: "Sau cụm tính từ 'hypervelocity orbital' cần danh từ không đếm được chỉ các mảnh vụn rác vũ trụ.",
        variants: [
          { form: "debris", pos: "uncount n.", label: "debris (Danh từ không đếm được mảnh vụn / rác vũ trụ)", isCorrect: true },
          { form: "debrief", pos: "v.", label: "debrief (Động từ phỏng vấn sau nhiệm vụ)", isCorrect: false },
          { form: "debridement", pos: "n.", label: "debridement (Thuật ngữ y khoa cắt lọc vết thương)", isCorrect: false }
        ]
      },
      {
        id: "u10_b4",
        num: 4,
        rootWord: "explore",
        category: "Scientific Discovery",
        targetForm: "exploration",
        grammarClue: "Cần danh từ làm chủ ngữ sau cụm 'scientific space' chỉ công cuộc thám hiểm không gian.",
        variants: [
          { form: "exploration", pos: "n.", label: "exploration (Danh từ sự thám hiểm không gian)", isCorrect: true },
          { form: "exploratory", pos: "adj.", label: "exploratory (Tính từ mang tính thăm dò)", isCorrect: false },
          { form: "exploring", pos: "gerund", label: "exploring (Hành động khám phá)", isCorrect: false }
        ]
      },
      {
        id: "u10_b5",
        num: 5,
        rootWord: "satellite",
        category: "Orbital Devices",
        targetForm: "satellites",
        grammarClue: "Sau cụm 'constellations of Earth-observation' cần danh từ số nhiều chỉ các chùm vệ tinh nhân tạo.",
        variants: [
          { form: "satellites", pos: "pl. n.", label: "satellites (Danh từ số nhiều các vệ tinh nhân tạo)", isCorrect: true },
          { form: "satellite", pos: "sing. n.", label: "satellite (Danh từ số ít vệ tinh)", isCorrect: false },
          { form: "satellitic", pos: "adj.", label: "satellitic (Tính từ thuộc vệ tinh)", isCorrect: false }
        ]
      },
      {
        id: "u10_b6",
        num: 6,
        rootWord: "orbit",
        category: "Spatial Position",
        targetForm: "orbital",
        grammarClue: "Cần tính từ đứng trước cụm danh từ 'vantage points' để chỉ các điểm quan sát từ quỹ đạo trên không.",
        variants: [
          { form: "orbital", pos: "adj.", label: "orbital (Tính từ thuộc quỹ đạo)", isCorrect: true },
          { form: "orbit", pos: "n./v.", label: "orbit (Quỹ đạo / bay quanh quỹ đạo)", isCorrect: false },
          { form: "orbitally", pos: "adv.", label: "orbitally (Phó từ theo quỹ đạo)", isCorrect: false }
        ]
      },
      {
        id: "u10_b7",
        num: 7,
        rootWord: "propel",
        category: "Rocket Engineering",
        targetForm: "propulsion",
        grammarClue: "Sau danh từ ghép 'rocket' cần danh từ chỉ hệ thống đẩy phản lực của tên lửa vũ trụ.",
        variants: [
          { form: "propulsion", pos: "n.", label: "propulsion (Danh từ lực đẩy phản lực / hệ thống đẩy)", isCorrect: true },
          { form: "propulsive", pos: "adj.", label: "propulsive (Tính từ mang tính đẩy)", isCorrect: false },
          { form: "propeller", pos: "n.", label: "propeller (Danh từ cánh quạt máy bay)", isCorrect: false }
        ]
      },
      {
        id: "u10_b8",
        num: 8,
        rootWord: "celestial",
        category: "Cosmic Entities",
        targetForm: "celestial",
        grammarClue: "Cần tính từ đứng trước danh từ 'bodies' để chỉ các thiên thể trong vũ trụ.",
        variants: [
          { form: "celestial", pos: "adj.", label: "celestial (Tính từ thuộc thiên thể / bầu trời)", isCorrect: true },
          { form: "celestially", pos: "adv.", label: "celestially (Phó từ một cách thiên thể)", isCorrect: false },
          { form: "celestiality", pos: "n.", label: "celestiality (Danh từ tính chất thần tiên)", isCorrect: false }
        ]
      },
      {
        id: "u10_b9",
        num: 9,
        rootWord: "weightless",
        category: "Microgravity Physics",
        targetForm: "weightlessness",
        grammarClue: "Sau giới từ 'conditions of prolonged' cần danh từ chỉ tình trạng không trọng lượng.",
        variants: [
          { form: "weightlessness", pos: "n.", label: "weightlessness (Danh từ tình trạng không trọng lượng)", isCorrect: true },
          { form: "weightless", pos: "adj.", label: "weightless (Tính từ không trọng lượng)", isCorrect: false },
          { form: "weightlessly", pos: "adv.", label: "weightlessly (Phó từ không trọng lượng)", isCorrect: false }
        ]
      },
      {
        id: "u10_b10",
        num: 10,
        rootWord: "colonize",
        category: "Space Settlement",
        targetForm: "colonization",
        grammarClue: "Sau tính từ 'interplanetary' cần danh từ chỉ việc khai hoang, định cư trên các hành tinh khác.",
        variants: [
          { form: "colonization", pos: "n.", label: "colonization (Danh từ sự khai hoang định cư hành tinh)", isCorrect: true },
          { form: "colonizer", pos: "n.", label: "colonizer (Danh từ người đi khai hoang)", isCorrect: false },
          { form: "colonial", pos: "adj.", label: "colonial (Tính từ thuộc địa)", isCorrect: false }
        ]
      }
    ],
    wordArsenal: [
      { root: "terrestrial", pos: "adj.", vi: "Thuộc về Trái Đất, trên mặt đất", cat: "Earth" },
      { root: "astronomical", pos: "adj.", vi: "Thuộc thiên văn, (kinh phí) khổng lồ", cat: "Scale" },
      { root: "debris", pos: "n.", vi: "Mảnh vụn vỡ, rác vũ trụ", cat: "Waste" },
      { root: "exploration", pos: "n.", vi: "Công cuộc thám hiểm không gian", cat: "Discovery" },
      { root: "satellite", pos: "n.", vi: "Vệ tinh nhân tạo quan trắc", cat: "Technology" },
      { root: "orbital", pos: "adj.", vi: "Thuộc về quỹ đạo vũ trụ", cat: "Physics" },
      { root: "propulsion", pos: "n.", vi: "Lực đẩy phản lực tên lửa", cat: "Engineering" },
      { root: "celestial", pos: "adj.", vi: "Thuộc về thiên thể, bầu trời", cat: "Cosmology" },
      { root: "weightlessness", pos: "n.", vi: "Trạng thái không trọng lượng", cat: "Physiology" },
      { root: "colonization", pos: "n.", vi: "Sự định cư, khai phá hành tinh", cat: "Settlement" }
    ],
    xrayHighlights: {
      thesis: [
        "While immediate domestic relief is indispensable, funding space exploration remains a vital investment for the collective preservation of human civilization.",
        "Pursuing interplanetary colonization and cosmic inquiry is not a frivolous distraction, but an indispensable prerequisite for securing humanity's scientific, technological, and ecological longevity."
      ],
      cohesion: [
        "In an era of economic volatility and escalating ecological peril",
        "Critics of space expenditure assert that",
        "From a utilitarian standpoint, allocating astronomical financial budgets",
        "Nevertheless, this short-sighted perspective fails to acknowledge that",
        "Furthermore, engineering advancements originally conceived for",
        "In conclusion, while earthly crises demand substantial and consistent budgetary allocations"
      ],
      lexical: [
        "escalating ecological peril",
        "pressing terrestrial crises",
        "astronomical financial budgets",
        "hypervelocity orbital debris",
        "Earth-observation satellites",
        "orbital vantage points",
        "rocket propulsion systems",
        "celestial bodies",
        "prolonged weightlessness",
        "interplanetary colonization"
      ]
    }
  },
  lexicon_notes: {
    orbit: {
      word: "orbit",
      ipa: "/ˈɔː.bɪt/",
      pos: "noun / verb",
      def_en: "The curved path through which an object in space moves around a star, planet, or moon; or to move around it in such a path.",
      def_vi: "Quỹ đạo chuyển động của thiên thể hoặc vệ tinh; (động từ) di chuyển theo quỹ đạo quanh một hành tinh.",
      collocations: "in orbit, enter orbit, put into orbit, low Earth orbit, geostationary orbit",
      example: "The communication satellite was placed into a geostationary orbit roughly 36,000 kilometers above the equator.",
      ielts_tip: "Dùng cụm 'put/place a satellite into low Earth orbit' thay vì cách diễn đạt đơn sơ 'send a satellite to space'."
    },
    satellite: {
      word: "satellite",
      ipa: "/ˈsæt.əl.aɪt/",
      pos: "noun",
      def_en: "An artificial body placed in orbit round the earth or another planet in order to collect information or for communication.",
      def_vi: "Vệ tinh nhân tạo hoặc vệ tinh tự nhiên chuyển động quanh hành tinh.",
      collocations: "artificial satellite, satellite imagery, weather satellite, satellite telecommunications",
      example: "Meteorologists rely on high-resolution satellite imagery to predict hurricane trajectories with remarkable precision.",
      ielts_tip: "'satellite imagery' và 'satellite navigation' là collocations điểm cộng rất lớn trong các bài viết về công nghệ giám sát môi trường."
    },
    celestial: {
      word: "celestial",
      ipa: "/səˈles.ti.əl/",
      pos: "adjective",
      def_en: "Positioned in or relating to the sky, or outer space as observed in astronomy.",
      def_vi: "Thuộc về bầu trời, các vì sao hoặc thiên thể vũ trụ.",
      collocations: "celestial body, celestial navigation, celestial mechanics, celestial sphere",
      example: "Before the advent of modern GPS, ancient navigators relied on the positions of celestial bodies to chart their courses across open oceans.",
      ielts_tip: "Thay vì lặp lại cụm 'stars and planets', hãy dùng 'celestial bodies' để nâng Band điểm Lexical Resource lên 8.0+."
    },
    extraterrestrial: {
      word: "extraterrestrial",
      ipa: "/ˌek.strə.təˈres.tri.əl/",
      pos: "adjective / noun",
      def_en: "Originating, existing, or occurring outside the earth or its atmosphere.",
      def_vi: "Ngoài Trái Đất, thuộc về sinh vật hoặc hiện tượng ngoài vũ trụ.",
      collocations: "extraterrestrial life, extraterrestrial civilization, search for extraterrestrial intelligence (SETI)",
      example: "Astrobiologists investigate subsurface hydrothermal vents on icy moons as potential habitats for extraterrestrial microbial life.",
      ielts_tip: "Luôn dùng 'extraterrestrial life / organisms' thay cho từ ngữ thông tục 'aliens' trong văn phong học thuật IELTS Writing."
    },
    weightlessness: {
      word: "weightlessness",
      ipa: "/ˈweɪt.ləs.nəs/",
      pos: "noun",
      def_en: "The state of having no weight, especially the condition of an astronaut in space or in an orbiting spacecraft.",
      def_vi: "Tình trạng không trọng lượng, trạng thái phi trọng lực.",
      collocations: "experience weightlessness, condition of weightlessness, effects of weightlessness",
      example: "Cosmonauts undergo rigorous resistance training to counter the debilitating bone density loss induced by prolonged weightlessness.",
      ielts_tip: "Kết hợp với các danh từ y học như 'muscular atrophy' (teo cơ) hoặc 'bone demineralization' (mất khoáng xương) khi bàn về tác hại của môi trường vũ trụ."
    },
    gravity: {
      word: "gravity",
      ipa: "/ˈɡræv.ə.ti/",
      pos: "noun",
      def_en: "The force that attracts a body towards the centre of the earth, or towards any other physical body having mass.",
      def_vi: "Lực hấp dẫn, trọng lực kéo vật thể về phía tâm hành tinh.",
      collocations: "force of gravity, zero gravity, overcome gravity, gravitational pull",
      example: "Heavy-lift launch vehicles consume massive volumes of liquid propellant simply to overcome Earth's gravitational pull.",
      ielts_tip: "Ngoài nghĩa vật lý, 'gravity' còn mang nghĩa trang trọng là 'tính chất nghiêm trọng' (e.g. the gravity of global warming)."
    },
    debris: {
      word: "debris",
      ipa: "/ˈdeb.riː/",
      pos: "noun",
      def_en: "Scattered pieces of waste or remains, especially of an explosive or violent destruction.",
      def_vi: "Mảnh vụn vỡ, phế liệu rác thải (đặc biệt là rác vũ trụ trên quỹ đạo).",
      collocations: "space debris, orbital debris, accumulation of debris, tracking space debris",
      example: "The rapid accumulation of space debris threatens to trigger cascading orbital collisions known as the Kessler syndrome.",
      ielts_tip: "Từ này là danh từ không đếm được và phát âm chữ 's' câm (/ˈdeb.riː/). Không bao giờ viết 'a debris' hay 'many debrises'."
    },
    propulsion: {
      word: "propulsion",
      ipa: "/prəˈpʌl.ʃən/",
      pos: "noun",
      def_en: "The action of driving or pushing forwards, typically using an engine or propellant force.",
      def_vi: "Lực đẩy phản lực, hệ thống đẩy cơ học đưa vật thể tiến về phía trước.",
      collocations: "rocket propulsion, ion propulsion, propulsion system, chemical propulsion",
      example: "Transitioning from chemical rockets to nuclear thermal propulsion could halve travel times for future manned voyages to Mars.",
      ielts_tip: "Dùng 'propulsion mechanism/system' khi viết về kỹ thuật hàng không vũ trụ và phương tiện giao thông tương lai."
    },
    vacuum: {
      word: "vacuum",
      ipa: "/ˈvæk.juːm/",
      pos: "noun",
      def_en: "A space entirely devoid of matter, especially air or gas.",
      def_vi: "Môi trường chân không, không gian hoàn toàn không có áp suất khí quyển và vật chất.",
      collocations: "the vacuum of space, create a vacuum, in a near-total vacuum, survive in a vacuum",
      example: "Space suits must supply artificial pressure to prevent body fluids from boiling in the cold vacuum of space.",
      ielts_tip: "Chú ý chính tả có 2 chữ 'u' (v-a-c-u-u-m), người học IELTS rất hay viết sai chính tả thành 'vaccuum'."
    },
    lunar: {
      word: "lunar",
      ipa: "/ˈluː.nər/",
      pos: "adjective",
      def_en: "Resembling, relating to, or conditioned by the moon.",
      def_vi: "Thuộc về Mặt Trăng, liên quan đến Mặt Trăng.",
      collocations: "lunar eclipse, lunar landing, lunar surface, lunar mission, lunar outpost",
      example: "Constructing a pressurized outpost on the lunar surface provides an ideal testbed for autonomous life-support systems.",
      ielts_tip: "Phân biệt 'lunar calendar' (âm lịch) và 'solar calendar' (dương lịch) trong các đề tài văn hóa xã hội."
    },
    solar: {
      word: "solar",
      ipa: "/ˈsəʊ.lər/",
      pos: "adjective",
      def_en: "Relating to or determined by the sun.",
      def_vi: "Thuộc về Mặt Trời, bắt nguồn từ năng lượng mặt trời.",
      collocations: "solar radiation, solar system, solar flare, solar panel, solar eclipse",
      example: "Deep-space explorers will require magnetic shields to safeguard their habitats against lethal bursts of solar radiation.",
      ielts_tip: "Cụm từ 'solar radiation' (bức xạ mặt trời) và 'solar array' (giàn pin mặt trời) rất hữu ích cho cả chủ đề năng lượng tái tạo lẫn công nghệ không gian."
    },
    colonization: {
      word: "colonization",
      ipa: "/ˌkɒl.ə.naɪˈzeɪ.ʃən/",
      pos: "noun",
      def_en: "The action of establishing control over foreign territory or setting up permanent settlements on other planets.",
      def_vi: "Sự định cư, khai hoang lập khu định cư sinh sống trên các hành tinh khác.",
      collocations: "space colonization, Mars colonization, interplanetary colonization, lunar colonization",
      example: "Proponents argue that the colonization of other planets offers an essential safeguard against global catastrophic extinction risks.",
      ielts_tip: "Trong chủ đề vũ trụ học, 'interplanetary colonization' đề cập đến việc mở rộng phạm vi cư trú của nhân loại để bảo tồn giống nòi."
    },
    astronomical: {
      word: "astronomical",
      ipa: "/ˌæs.trəˈnɒm.ɪ.kəl/",
      pos: "adjective",
      def_en: "Relating to astronomy; or (informally) of an amount extremely large.",
      def_vi: "Thuộc về thiên văn học; (nghĩa bóng) con số cực kỳ to lớn, khổng lồ (về chi phí, khoảng cách).",
      collocations: "astronomical costs, astronomical sums, astronomical figures, astronomical observations",
      example: "The astronomical costs associated with constructing orbital space stations have led governments to form multinational consortiums.",
      ielts_tip: "Dùng 'astronomical sums/costs' để nhấn mạnh mức chi phí khổng lồ thay vì chỉ dùng 'very high costs'."
    },
    interplanetary: {
      word: "interplanetary",
      ipa: "/ˌɪn.təˈplæn.ɪ.tri/",
      pos: "adjective",
      def_en: "Situated or travelling between planets.",
      def_vi: "Giữa các hành tinh, mang tầm vóc liên hành tinh.",
      collocations: "interplanetary travel, interplanetary mission, interplanetary spacecraft, interplanetary dust",
      example: "Long-duration interplanetary travel exposes astronauts to intense cosmic rays and protracted psychological isolation.",
      ielts_tip: "Ghi nhớ bộ tiền tố 'inter-': 'interplanetary' (giữa các hành tinh), 'interstellar' (giữa các ngôi sao), 'intergalactic' (giữa các thiên hà)."
    },
    atmosphere: {
      word: "atmosphere",
      ipa: "/ˈæt.məs.fɪər/",
      pos: "noun",
      def_en: "The envelope of gases surrounding the earth or another planet.",
      def_vi: "Khí quyển bao quanh một hành tinh; bầu không khí.",
      collocations: "planetary atmosphere, re-enter the atmosphere, upper atmosphere, atmospheric pressure",
      example: "Space capsules require specialized ablative heat shields when they re-enter the Earth's atmosphere at extreme hypersonic speeds.",
      ielts_tip: "Cụm 're-enter the Earth's atmosphere' (tái nhập khí quyển Trái Đất) là cụm từ chuyên môn rất chuẩn xác trong Reading và Writing."
    },
    cosmos: {
      word: "cosmos",
      ipa: "/ˈkɒz.mɒs/",
      pos: "noun",
      def_en: "The universe seen as a well-ordered whole.",
      def_vi: "Vũ trụ trật tự, bao la và hùng vĩ.",
      collocations: "explore the cosmos, order of the cosmos, wonders of the cosmos, place in the cosmos",
      example: "Peering billions of light-years into the cosmos forces humanity to reflect with humility on our fragile planetary existence.",
      ielts_tip: "Từ 'cosmos' mang sắc thái triết học và hùng vĩ hơn từ thông dụng 'universe' hay 'outer space'."
    },
    trajectory: {
      word: "trajectory",
      ipa: "/trəˈdʒek.tər.i/",
      pos: "noun",
      def_en: "The curved path followed by a projectile flying or an object moving under the action of given forces.",
      def_vi: "Quỹ đạo bay, đường đạn hoặc tiến trình/đà phát triển.",
      collocations: "flight trajectory, orbital trajectory, alter the trajectory, calculate the trajectory",
      example: "Engineers performed a course correction burn to adjust the interplanetary probe's trajectory towards Jupiter's orbital corridor.",
      ielts_tip: "'trajectory' được dùng rất rộng rãi trong Writing Task 1 và Task 2 theo nghĩa bóng: 'an upward economic trajectory' (đà tăng trưởng kinh tế đi lên)."
    },
    terrestrial: {
      word: "terrestrial",
      ipa: "/təˈres.tri.əl/",
      pos: "adjective",
      def_en: "Of, on, or relating to the earth; of or relating to land as distinct from water.",
      def_vi: "Thuộc về Trái Đất, thuộc về mặt đất / đất liền (đối lập với ngoài không gian hoặc đại dương).",
      collocations: "terrestrial crises, terrestrial ecosystems, terrestrial challenges, extraterrestrial vs terrestrial",
      example: "Pragmatic critics contend that solving terrestrial crises such as global hunger should supersede ambitious interplanetary exploration.",
      ielts_tip: "Luôn dùng cặp đối chiếu 'terrestrial problems' (những vấn đề trên mặt đất/Trái Đất) và 'extraterrestrial exploration' (thám hiểm ngoài Trái Đất)."
    }
  }
};
