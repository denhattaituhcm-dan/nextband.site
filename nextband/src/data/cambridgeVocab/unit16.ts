import { CambridgeUnitData } from "./types";

export const unit16Data: CambridgeUnitData = {
  meta: {
    unit: 16,
    title: "THE ENERGY CRISIS: FOSSIL FUELS & NUCLEAR POWER",
    subTitle: "Khủng hoảng Năng lượng, Nhiên liệu Hóa thạch & Điện Hạt nhân",
    book: "Cambridge Vocabulary for IELTS - Unit 16 (Energy)",
    cefr: "B2 - C1 (IELTS 6.5 - 8.5)",
    totalStages: 3,
    speedGoalWpm: 45,
    paperSpeedMultiplier: "7.0x"
  },
  stage1_magnets: [
    {
      id: "s1_u16_m1",
      sentenceBefore: "Rapid industrial expansion and unchecked consumer demand threaten to severely",
      sentenceAfter: "the planet's subterranean petroleum reservoirs within the next few decades.",
      target: "deplete",
      options: [
        {
          word: "exhaust",
          pos: "v.",
          hint: "Dùng cạn kiệt hoàn toàn không còn sót lại gì hoặc làm ai đó kiệt sức (exhausted).",
          explanation: "'exhaust' nhấn mạnh việc làm cạn sạch hoàn toàn hoặc kiệt sức, trong khi đi với các mỏ quặng trữ lượng khoáng sản thiên nhiên thì 'deplete reserves/supplies' là cụm từ học thuật chuẩn xác nhất."
        },
        {
          word: "deplete",
          pos: "v.",
          hint: "Làm vơi cạn, suy giảm nghiêm trọng trữ lượng tài nguyên thiên nhiên hoặc nguồn cung.",
          explanation: "Chính xác! 'deplete natural resources / deplete petroleum reservoirs' (làm vơi cạn trữ lượng tài nguyên) là thuật ngữ học thuật Band 8.0 chuẩn xác."
        },
        {
          word: "drain",
          pos: "v.",
          hint: "Rút cạn chất lỏng (drain water) hoặc làm tiêu hao dần tiền tài/sức lực theo nghĩa bóng.",
          explanation: "'drain' thường dùng cho việc thoát nước cơ học hoặc tiêu hao tài chính (drain finances), không phải thuật ngữ sinh thái tiêu chuẩn cho các mỏ dầu địa chất."
        }
      ],
      ieltsInsight: {
        collocation: "deplete natural resources / deplete fossil fuel reserves / resource depletion",
        bandScore: "Band 8.0",
        synonyms: ["diminish reserves", "impoverish natural stocks", "drain supplies"],
        academicTip: "Cụm danh từ 'the rapid depletion of finite fossil fuels' là một trong những cụm mở bài đắt giá nhất cho đề tài môi trường và khủng hoảng năng lượng."
      }
    },
    {
      id: "s1_u16_m2",
      sentenceBefore: "Heavy economic reliance on carbon-intensive",
      sentenceAfter: "fuels such as coal, lignite, and petroleum remains the primary driver of catastrophic global warming.",
      target: "fossil",
      options: [
        {
          word: "synthetic",
          pos: "adj.",
          hint: "Nhân tạo, được tổng hợp trong phòng thí nghiệm hóa học chứ không có sẵn tự nhiên.",
          explanation: "'synthetic' chỉ các chất nhân tạo như sợi tổng hợp hoặc xăng tổng hợp hóa học, trái ngược với than đá khai thác tự nhiên từ lòng đất."
        },
        {
          word: "fossil",
          pos: "adj./n.",
          hint: "Hóa thạch; nhiên liệu hình thành từ xác sinh vật cổ đại chôn vùi hàng triệu năm dưới lòng đất.",
          explanation: "Chính xác! 'fossil fuels' (nhiên liệu hóa thạch: than đá, dầu thô, khí đốt tự nhiên) là thuật ngữ khoa học cố định không thể thay thế."
        },
        {
          word: "organic",
          pos: "adj.",
          hint: "Hữu cơ, có nguồn gốc sinh học hoặc nông nghiệp sạch không dùng phân bón hóa học.",
          explanation: "'organic' dùng cho thực phẩm hữu cơ hoặc phân bón sinh học, không kết hợp với 'fuels' để chỉ than và dầu mỏ gây ô nhiễm."
        }
      ],
      ieltsInsight: {
        collocation: "fossil fuels / fossil fuel combustion / transition away from fossil fuels",
        bandScore: "Band 7.5+",
        synonyms: ["hydrocarbon fuels", "non-renewable energy sources", "petrochemical supplies"],
        academicTip: "Trong IELTS Writing Task 2, hãy thay đổi linh hoạt giữa 'fossil fuels', 'conventional hydrocarbons', và 'non-renewable energy sources' để tránh lặp từ."
      }
    },
    {
      id: "s1_u16_m3",
      sentenceBefore: "Advocates argue that modern",
      sentenceAfter: "power generates immense quantities of baseload electricity without discharging greenhouse gases into the atmosphere.",
      target: "nuclear",
      options: [
        {
          word: "atomic",
          pos: "adj.",
          hint: "Thuộc về nguyên tử; 'atomic bomb' gợi nhớ đến vũ khí quân sự thời Thế chiến thứ hai.",
          explanation: "'atomic' mang sắc thái vật lý nguyên tử cổ điển hoặc vũ khí hủy diệt, trong khi ngành công nghiệp năng lượng hòa bình quốc tế luôn dùng 'nuclear power'."
        },
        {
          word: "nuclear",
          pos: "adj.",
          hint: "Thuộc về hạt nhân, khai thác năng lượng từ sự biến đổi bên trong tâm hạt nhân nguyên tử.",
          explanation: "Chính xác! 'nuclear power / nuclear energy / nuclear station' (điện hạt nhân) là thuật ngữ quy chuẩn toàn cầu."
        },
        {
          word: "radioactive",
          pos: "adj.",
          hint: "Có tính phóng xạ, phát ra các tia bức xạ hạt nhân ion hóa nguy hiểm cho sức khỏe.",
          explanation: "'radioactive' là tính từ miêu tả tính chất bức xạ độc hại (radioactive waste/decay), không dùng để định danh phương thức sản xuất điện năng."
        }
      ],
      ieltsInsight: {
        collocation: "nuclear power / nuclear reactor / nuclear energy generation / nuclear proliferation",
        bandScore: "Band 8.0",
        synonyms: ["atomic power", "fission-derived electricity", "nuclear generation"],
        academicTip: "Dùng 'baseload nuclear power' để nhấn mạnh ưu thế cung cấp nguồn điện nền liên tục 24/7 của điện hạt nhân so với điện mặt trời gián đoạn."
      }
    },
    {
      id: "s1_u16_m4",
      sentenceBefore: "Technicians initiated a self-sustaining chain reaction inside the core of the newly built",
      sentenceAfter: "to produce superheated steam that turns massive electricity turbines.",
      target: "reactor",
      options: [
        {
          word: "generator",
          pos: "n.",
          hint: "Máy phát điện cơ điện tử biến đổi động năng quay của tua-bin thành dòng điện xoay chiều.",
          explanation: "'generator' chỉ cỗ máy phát điện nói chung nhờ cảm ứng điện từ, không phải buồng chứa nơi phản ứng bẻ gãy hạt nhân diễn ra."
        },
        {
          word: "reactor",
          pos: "n.",
          hint: "Lò phản ứng hạt nhân, nơi phản ứng phân hạch uranium được duy trì và kiểm soát an toàn.",
          explanation: "Chính xác! 'nuclear reactor' (lò phản ứng hạt nhân) là trái tim công nghệ nơi sinh ra nhiệt năng khổng lồ."
        },
        {
          word: "incinerator",
          pos: "n.",
          hint: "Lò thiêu hủy rác thải sinh hoạt hoặc chất thải bệnh viện bằng ngọn lửa nhiệt độ cao.",
          explanation: "'incinerator' là lò đốt rác cơ học, hoàn toàn không liên quan đến cơ chế vật lý hạt nhân công nghệ cao."
        }
      ],
      ieltsInsight: {
        collocation: "nuclear reactor / reactor core / shut down a reactor / cooling system malfunction",
        bandScore: "Band 8.0",
        synonyms: ["atomic pile", "fission vessel", "nuclear containment facility"],
        academicTip: "Nắm vững cấu trúc 'containment vessel around the reactor core' (vỏ bọc an toàn quanh vùng lõi lò phản ứng) để đạt điểm Task 2 tối đa khi bàn về tính an toàn hạt nhân."
      }
    },
    {
      id: "s1_u16_m5",
      sentenceBefore: "Geopolitical embargoes and steep reductions in pipeline shipments triggered an acute international energy",
      sentenceAfter: "forcing industrialized economies to ration electricity and fuel supplies.",
      target: "crisis",
      options: [
        {
          word: "dilemma",
          pos: "n.",
          hint: "Tình thế lưỡng nan, tiến thoái lưỡng nan giữa hai lựa chọn khó khăn về mặt đạo đức hoặc chính sách.",
          explanation: "'dilemma' là sự phân vân lựa chọn chính sách (ethical dilemma), không miêu tả tình trạng thiếu hụt trầm trọng gây tê liệt nền kinh tế."
        },
        {
          word: "crisis",
          pos: "n.",
          hint: "Cuộc khủng hoảng nghiêm trọng, thời điểm khẩn cấp đe dọa trực tiếp đến sự sống còn và ổn định kinh tế.",
          explanation: "Chính xác! 'energy crisis' (khủng hoảng năng lượng) là thuật ngữ kinh tế - địa chính trị phổ biến và chính xác nhất."
        },
        {
          word: "catastrophe",
          pos: "n.",
          hint: "Đại thảm họa gây đổ vỡ hoàn toàn, sụp đổ tức thì hoặc thương vong hàng loạt (natural catastrophe).",
          explanation: "'catastrophe' chỉ sự kiện thảm khốc tàn phá ngay tức khắc như động đất, sóng thần; sự thiếu hụt năng lượng thị trường gọi là 'crisis'."
        }
      ],
      ieltsInsight: {
        collocation: "energy crisis / acute fuel crisis / avert an energy crisis / navigate the crisis",
        bandScore: "Band 7.5+",
        synonyms: ["energy crunch", "power emergency", "acute fuel predicament"],
        academicTip: "Kết hợp tính từ mạnh như 'precipitate an acute energy crisis' (châm ngòi cho một cuộc khủng hoảng năng lượng gay gắt) trong các bài viết thảo luận nguyên nhân - giải pháp."
      }
    },
    {
      id: "s1_u16_m6",
      sentenceBefore: "Despite discovering several deepwater gas basins, the nation's proven domestic hydrocarbon",
      sentenceAfter: "are projected to run dry within the next thirty to forty years.",
      target: "reserves",
      options: [
        {
          word: "surplus",
          pos: "n.",
          hint: "Số lượng thặng dư dôi thừa vượt quá nhu cầu tiêu thụ hiện tại (trade surplus, surplus energy).",
          explanation: "'surplus' chỉ lượng hàng hóa thặng dư dư thừa, trái ngược hoàn toàn với trữ lượng hữu hạn sắp cạn kiệt trong lòng đất."
        },
        {
          word: "reserves",
          pos: "pl. n.",
          hint: "Trữ lượng tài nguyên khoáng sản thiên nhiên đã được thăm dò và kiểm chứng dưới lòng đất.",
          explanation: "Chính xác! 'hydrocarbon reserves / oil and gas reserves' (trữ lượng dầu khí) là thuật ngữ địa chất và năng lượng quốc tế chuẩn xác."
        },
        {
          word: "stockpiles",
          pos: "pl. n.",
          hint: "Kho tích trữ hàng hóa vật chất do con người chủ động gom lại trong kho bãi để phòng nguy cấp.",
          explanation: "'stockpiles' là các kho chứa than đá hay thiết bị đã khai thác lên mặt đất, không dùng để chỉ tài nguyên tự nhiên ẩn sâu trong các vỉa địa chất."
        }
      ],
      ieltsInsight: {
        collocation: "proven oil reserves / subterranean reserves / deplete hydrocarbon reserves",
        bandScore: "Band 8.0",
        synonyms: ["proven deposits", "underground energy endowments", "geological stores"],
        academicTip: "'proven reserves' (trữ lượng đã được thẩm định chắc chắn có thể khai thác thương mại) là cụm từ C2 chuyên sâu giúp bài viết đạt điểm Lexical cao."
      }
    },
    {
      id: "s1_u16_m7",
      sentenceBefore: "Environmental economists strongly recommend that rather than propping up oil conglomerates, governments should heavily",
      sentenceAfter: "the research, installation, and deployment of domestic renewable energy infrastructure.",
      target: "subsidize",
      options: [
        {
          word: "tax",
          pos: "v.",
          hint: "Đánh thuế, thu tiền thuế từ các doanh nghiệp hoặc người tiêu dùng.",
          explanation: "'tax' có nghĩa là thu thuế, trong khi ngữ cảnh khuyến khích phát triển năng lượng xanh bằng ngân sách nhà nước đòi hỏi nghĩa 'trợ giá/tài trợ'."
        },
        {
          word: "subsidize",
          pos: "v.",
          hint: "Trợ giá, bao cấp, trích ngân sách tài trợ một phần chi phí để khuyến khích phát triển sản xuất.",
          explanation: "Chính xác! 'subsidize renewable energy / subsidize clean tech' (trợ cấp/trợ giá cho năng lượng sạch) là giải pháp cốt lõi trong chính sách công."
        },
        {
          word: "boycott",
          pos: "v.",
          hint: "Tẩy chay, từ chối giao thương hoặc tiêu dùng hàng hóa từ một đơn vị nào đó.",
          explanation: "'boycott' là hành động người tiêu dùng tẩy chay hàng hóa vì lý do đạo đức, không phải chính sách tài khóa của chính phủ nhằm phát triển hạ tầng."
        }
      ],
      ieltsInsight: {
        collocation: "subsidize renewable energy / government subsidies / heavily subsidized tariffs",
        bandScore: "Band 8.0",
        synonyms: ["financially underwrite", "incentivize with public funds", "grant state subsidies to"],
        academicTip: "Sử dụng cấu trúc 'governments must heavily subsidize the transition towards green energy' trong đoạn đề xuất giải pháp ở Task 2."
      }
    },
    {
      id: "s1_u16_m8",
      sentenceBefore: "During unprecedented summer heatwaves, the overburdened transmission network broke down, plunging major cities into rolling",
      sentenceAfter: "that paralyzed municipal subway systems and residential air conditioning.",
      target: "blackouts",
      options: [
        {
          word: "shortages",
          pos: "pl. n.",
          hint: "Sự thiếu hụt nguồn cung ứng hàng hóa hoặc lương thực nói chung (water/food shortages).",
          explanation: "'shortages' chỉ sự khan hiếm nguồn cung, trong khi hiện tượng cúp điện, mất điện làm cả thành phố tối đen được định danh là 'blackouts'."
        },
        {
          word: "blackouts",
          pos: "pl. n.",
          hint: "Sự cố mất điện diện rộng, sự cố cắt điện khiến toàn bộ khu vực chìm trong bóng tối.",
          explanation: "Chính xác! 'rolling blackouts / power blackouts' (sự cố mất điện luân phiên/mất điện diện rộng) là thuật ngữ miêu tả sự cố sụp đổ lưới điện."
        },
        {
          word: "curfews",
          pos: "pl. n.",
          hint: "Lệnh giới nghiêm cấm người dân ra đường vào ban đêm do chính quyền ban hành.",
          explanation: "'curfews' là lệnh giới nghiêm hành chính/an ninh trật tự, hoàn toàn không liên quan đến sự cố kỹ thuật điện lực."
        }
      ],
      ieltsInsight: {
        collocation: "rolling blackouts / prolonged power blackouts / widespread blackout",
        bandScore: "Band 8.0",
        synonyms: ["power outages", "electrical grid disruptions", "loss of power"],
        academicTip: "Cụm 'suffer rolling blackouts' (hứng chịu cảnh mất điện luân phiên) là cách diễn đạt cực kỳ sinh động và tự nhiên cho các chủ đề hạ tầng và năng lượng."
      }
    }
  ],
  stage2_timeline: [
    {
      milestoneId: "u16_t1",
      age: "Thế kỷ 18 (1769 - 1800)",
      title: "Kỷ Nguyên Than Đá & Động Cơ Hơi Nước",
      icon: "flame",
      stageTag: "Coal Revolution",
      story: "Việc cải tiến động cơ hơi nước của James Watt đã giải phóng năng lượng cơ học khổng lồ từ quá trình [BLANK] than đá, khơi mào cho cuộc Cách mạng Công nghiệp toàn cầu.",
      storyEn: "The invention of the modern steam engine unlocked colossal mechanical energy from the [BLANK] of coal, igniting the global Industrial Revolution.",
      target: "combustion",
      targetVi: "sự đốt cháy/quá trình đốt",
      pos: "noun",
      candidates: ["combustion", "condensation", "freezing", "evaporation"],
      explanation: "'combustion' (sự đốt cháy/phản ứng cháy) biến đổi năng lượng hóa học chứa trong than đá thành nhiệt năng và cơ năng đẩy bánh xe lịch sử tiến về phía trước."
    },
    {
      milestoneId: "u16_t2",
      age: "Năm 1859 - Đầu Thế kỷ 20",
      title: "Cơn Sốt Dầu Mỏ & Động Cơ Đốt Trong",
      icon: "droplet",
      stageTag: "Petroleum Boom",
      story: "Giếng khoan dầu tại Titusville (Pennsylvania) đã mở ra thời kỳ khai thác ồ ạt dầu mỏ [BLANK], cung cấp dòng máu nhiên liệu lỏng cho toàn bộ nền giao thông vận tải hiện đại.",
      storyEn: "Drilling operations at Titusville unlocked abundant subterranean reservoirs of [BLANK] oil, sparking an unprecedented global transportation and automotive boom.",
      target: "crude",
      targetVi: "thô/nguyên khai (dầu thô)",
      pos: "adjective",
      candidates: ["crude", "cooked", "refined", "synthetic"],
      explanation: "'crude oil' (dầu thô) là nguồn nhiên liệu hóa thạch dạng lỏng nguyên khai chưa qua chưng cất, nguyên liệu đầu vào thiết yếu của ngành công nghiệp lọc hóa dầu."
    },
    {
      milestoneId: "u16_t3",
      age: "Thập niên 1930s",
      title: "Thủy Điện Khổng Lồ & Mạng Lưới Điện Quốc Gia",
      icon: "zap",
      stageTag: "Hydroelectric Grid",
      story: "Việc khánh thành các đập nước quy mô thế kỷ như Đập Hoover đã biến đổi sức nước thành dòng điện cao thế truyền tải dọc theo [BLANK] điện lực quốc gia.",
      storyEn: "Monumental civil engineering marvels like the Hoover Dam converted rushing river currents into high-voltage electricity distributed through the national [BLANK].",
      target: "grid",
      targetVi: "mạng lưới truyền tải điện",
      pos: "noun",
      candidates: ["grid", "pipeline", "furnace", "conduit"],
      explanation: "'electricity grid' (mạng lưới truyền tải và phân phối điện năng) kết nối các nhà máy sản xuất điện trực tiếp đến các trung tâm công nghiệp và khu dân cư đô thị."
    },
    {
      milestoneId: "u16_t4",
      age: "Năm 1954 - 1956",
      title: "Phản Ứng Phân Hạch & Bình Minh Điện Hạt Nhân",
      icon: "atom",
      stageTag: "Nuclear Fission",
      story: "Các nhà khoa học phát hiện ra rằng việc bẻ gãy hạt nhân uranium thông qua phản ứng [BLANK] có thể giải phóng nhiệt lượng cực đại để phát điện không phát thải khói bụi.",
      storyEn: "Physicists discovered that splitting the atomic nucleus of uranium through controlled [BLANK] could yield colossal quantities of carbon-free thermal energy.",
      target: "fission",
      targetVi: "phản ứng phân hạch hạt nhân",
      pos: "noun",
      candidates: ["fission", "dilution", "crystallization", "osmosis"],
      explanation: "'nuclear fission' (phản ứng phân hạch) là quá trình tách hạt nhân nguyên tử nặng (uranium-235) thành các mảnh nhẹ hơn kèm theo năng lượng tỏa nhiệt khổng lồ."
    },
    {
      milestoneId: "u16_t5",
      age: "Năm 1973 - 1979",
      title: "Cú Sốc Dầu Mỏ OPEC & Báo Động Năng Lượng",
      icon: "alert-triangle",
      stageTag: "Global Energy Crisis",
      story: "Lệnh cấm vận dầu mỏ của khối OPEC đã khiến giá dầu phi mã gấp bốn lần, gây ra cuộc khủng hoảng năng lượng và tình trạng [BLANK] nhiên liệu lịch sử ở các nước phát triển.",
      storyEn: "The 1973 OPEC oil embargo quadrupled oil prices, plunging Western economies into an acute fuel [BLANK] and awakening the world to energy vulnerability.",
      target: "shortage",
      targetVi: "sự khan hiếm/thiếu hụt",
      pos: "noun",
      candidates: ["shortage", "abundance", "surplus", "overflow"],
      explanation: "'fuel shortage' (sự thiếu hụt nhiên liệu cấp tính) buộc các quốc gia công nghiệp hóa phải thành lập kho dự trữ dầu chiến lược và tái cơ cấu chính sách năng lượng."
    },
    {
      milestoneId: "u16_t6",
      age: "Năm 1986 & 2011",
      title: "Thảm Họa Chernobyl & Fukushima",
      icon: "shield-alert",
      stageTag: "Meltdown Catastrophe",
      story: "Sự cố nổ lò phản ứng đã dẫn đến hiện tượng tan chảy tâm lò [BLANK], phát tán bụi phóng xạ độc hại khắp bán cầu và dấy lên làn sóng phản đối điện hạt nhân toàn cầu.",
      storyEn: "Devastating cooling system failures triggered a catastrophic core [BLANK], unleashing perilous clouds of radioactive fallout and igniting global anti-nuclear skepticism.",
      target: "meltdown",
      targetVi: "sự tan chảy vùng lõi lò phản ứng",
      pos: "noun",
      candidates: ["meltdown", "shutdown", "upgrade", "retrofit"],
      explanation: "'nuclear meltdown' (sự cố nóng chảy vùng lõi lò phản ứng) xảy ra khi thanh nhiên liệu uranium không được làm mát kịp thời, bị nung chảy và phá hủy vỏ bọc containment."
    },
    {
      milestoneId: "u16_t7",
      age: "Đầu Thế kỷ 21 (2010s)",
      title: "Cuộc Cách Mạng Năng Lượng Tái Tạo",
      icon: "sun",
      stageTag: "Decarbonization",
      story: "Trước sức ép biến đổi khí hậu, thế giới đẩy mạnh đầu tư vào các nguồn năng lượng có thể [BLANK] liên tục từ gió và mặt trời mà không bao giờ cạn kiệt.",
      storyEn: "To avert catastrophic planetary warming, nations accelerated capital deployment into [BLANK] resources that harness inexhaustible natural forces without carbon emissions.",
      target: "renewable",
      targetVi: "có thể tái tạo",
      pos: "adjective",
      candidates: ["renewable", "exhaustible", "hazardous", "finite"],
      explanation: "'renewable energy' (năng lượng tái tạo) bắt nguồn từ các nguồn vô tận của tự nhiên như nắng, gió, sóng biển và địa nhiệt, không thải ra khí nhà kính."
    },
    {
      milestoneId: "u16_t8",
      age: "Hiện tại & Tương lai (2020s - 2030s+)",
      title: "Phản Ứng Nhiệt Hạch - Chén Thánh Năng Lượng Sạch",
      icon: "sparkles",
      stageTag: "Nuclear Fusion",
      story: "Bắt chước cơ chế phát sáng của mặt trời, phản ứng nhiệt hạch [BLANK] hứa hẹn nguồn điện năng vô tận, hoàn toàn không phát thải carbon và không để lại rác thải phóng xạ ngàn năm.",
      storyEn: "Replicating the stellar furnace of the sun, nuclear [BLANK] represents the holy grail of clean power, promising inexhaustible energy without long-lived radioactive isotopes.",
      target: "fusion",
      targetVi: "phản ứng nhiệt hạch (tổng hợp hạt nhân)",
      pos: "noun",
      candidates: ["fusion", "friction", "combustion", "erosion"],
      explanation: "'nuclear fusion' (phản ứng nhiệt hạch) hợp nhất hai nguyên tử hydro nhẹ thành khí heli, giải phóng nguồn năng lượng sạch vô hạn và an toàn vượt trội so với phân hạch."
    }
  ],
  stage3_essay: {
    title: "Nuclear Energy: Hazardous Gamble vs Clean Power Savior",
    prompt: "As fossil fuel reserves dwindle and climate change accelerates, some people believe that nuclear energy is the ultimate solution to the global energy crisis. Others argue that the risks of catastrophic radioactive accidents and toxic nuclear waste make it too dangerous to pursue. Discuss both views and give your own opinion.",
    paragraphs: [
      {
        pIndex: 1,
        type: "Introduction",
        text: "In an epoch fraught with escalating climatic upheaval and the impending exhaustion of conventional hydrocarbons, the future of the global power sector has sparked fierce controversy. While skeptics assert that atomic power is an unacceptably perilous enterprise plagued by radioactive contamination and meltdown hazards, proponents maintain that it offers the only viable zero-carbon baseload energy capable of sustaining industrial civilization. In this essay, I will examine both perspectives before arguing that modern nuclear technology, when bolstered by next-generation safety standards, represents an indispensable pillar of our ecological salvation."
      },
      {
        pIndex: 2,
        type: "Body 1 (Nuclear Risks, Waste Disposal & Meltdown Hazards)",
        text: "Opponents of nuclear expansion raise legitimate concerns regarding environmental toxicity and catastrophic operational failures. Chief among these is the unresolved conundrum of highly [BLANK_1] nuclear waste, which remains deadly to organic life for tens of thousands of years without fully foolproof subterranean repositories. Furthermore, history has demonstrated that even the most meticulously engineered facilities remain vulnerable to unforeseen natural calamities or human blunders, as witnessed during the historical [BLANK_2] at Chernobyl and Fukushima. A single cooling malfunction can induce a core [BLANK_3], resulting in atmospheric fallout that renders vast agricultural zones uninhabitable for centuries and inflicts immense economic damage on afflicted nations."
      },
      {
        pIndex: 3,
        type: "Body 2 (Decarbonization, Baseload Reliability & Energy Security)",
        text: "Notwithstanding these undeniable hazards, nuclear power remains an irreplaceable bulwark against the ongoing global energy crisis. The relentless [BLANK_4] of underground petroleum and coal reserves has exposed economies to crippling fuel [BLANK_5] and inflationary shocks. Unlike intermittent solar and wind installations, which depend heavily on weather conditions and lack grid-scale storage, a nuclear [BLANK_6] provides an uninterrupted, high-capacity electricity flow 24 hours a day. By choosing to [BLANK_7] atomic fission, industrialized nations can drastically curtail greenhouse gas emissions while simultaneously achieving national energy [BLANK_8], shielding themselves from volatile foreign oil cartel politics."
      },
      {
        pIndex: 4,
        type: "Conclusion & Final Stance",
        text: "In conclusion, while concerns surrounding hazardous waste and operational safety are well-founded, abandoning nuclear technology amidst an acute planetary climate emergency would be a fatal error. Forward-thinking governments should not discard atomic power; rather, they must heavily [BLANK_9] the development of fourth-generation thorium and small modular reactors. Only through such technologically rigorous approaches can human civilization construct a genuinely [BLANK_10] energy paradigm capable of powering future generations without destabilizing the global biosphere."
      }
    ],
    blanks: [
      {
        id: "u16_b1",
        num: 1,
        rootWord: "radioactive",
        category: "Nuclear Hazards",
        targetForm: "radioactive",
        grammarClue: "Cần tính từ đứng trước danh từ 'nuclear waste' để chỉ tính chất độc hại phát xạ phóng xạ.",
        variants: [
          { form: "radioactive", pos: "adj.", label: "radioactive (Tính từ có tính phóng xạ độc hại)", isCorrect: true },
          { form: "radioactivity", pos: "n.", label: "radioactivity (Danh từ hiện tượng phát xạ)", isCorrect: false },
          { form: "radioactively", pos: "adv.", label: "radioactively (Phó từ phát xạ)", isCorrect: false }
        ]
      },
      {
        id: "u16_b2",
        num: 2,
        rootWord: "catastrophe",
        category: "Accidents",
        targetForm: "catastrophes",
        grammarClue: "Sau tính từ 'historical' và trước cụm 'at Chernobyl and Fukushima' cần danh từ số nhiều chỉ các thảm họa lịch sử.",
        variants: [
          { form: "catastrophes", pos: "pl. n.", label: "catastrophes (Danh từ số nhiều các thảm họa)", isCorrect: true },
          { form: "catastrophic", pos: "adj.", label: "catastrophic (Tính từ mang tính thảm họa)", isCorrect: false },
          { form: "catastrophically", pos: "adv.", label: "catastrophically (Phó từ một cách thảm khốc)", isCorrect: false }
        ]
      },
      {
        id: "u16_b3",
        num: 3,
        rootWord: "meltdown",
        category: "Nuclear Accidents",
        targetForm: "meltdown",
        grammarClue: "Cụm danh từ 'a core meltdown' chỉ sự cố tan chảy vùng lõi lò phản ứng hạt nhân.",
        variants: [
          { form: "meltdown", pos: "sing. n.", label: "meltdown (Danh từ sự cố tan chảy vùng lõi)", isCorrect: true },
          { form: "melting", pos: "gerund", label: "melting (Hành động đang tan chảy)", isCorrect: false },
          { form: "melts", pos: "v. 3rd", label: "melts (Động từ chia thì hiện tại số ít)", isCorrect: false }
        ]
      },
      {
        id: "u16_b4",
        num: 4,
        rootWord: "deplete",
        category: "Resource Scarcity",
        targetForm: "depletion",
        grammarClue: "Sau mạo từ 'The' và tính từ 'relentless' cần danh từ chỉ sự cạn kiệt liên tục của tài nguyên.",
        variants: [
          { form: "depletion", pos: "n.", label: "depletion (Danh từ sự cạn kiệt tài nguyên)", isCorrect: true },
          { form: "depleted", pos: "adj.", label: "depleted (Tính từ bị cạn kiệt)", isCorrect: false },
          { form: "depleting", pos: "participle", label: "depleting (Hành động làm cạn kiệt)", isCorrect: false }
        ]
      },
      {
        id: "u16_b5",
        num: 5,
        rootWord: "shortage",
        category: "Supply Deficit",
        targetForm: "shortages",
        grammarClue: "Sau danh từ bổ nghĩa 'fuel' cần danh từ số nhiều 'shortages' chỉ các đợt thiếu hụt nguồn cung nhiên liệu.",
        variants: [
          { form: "shortages", pos: "pl. n.", label: "shortages (Danh từ số nhiều sự thiếu hụt nhiên liệu)", isCorrect: true },
          { form: "shorten", pos: "v.", label: "shorten (Động từ rút ngắn)", isCorrect: false },
          { form: "shortly", pos: "adv.", label: "shortly (Phó từ trong thời gian ngắn)", isCorrect: false }
        ]
      },
      {
        id: "u16_b6",
        num: 6,
        rootWord: "reactor",
        category: "Energy Infrastructure",
        targetForm: "reactor",
        grammarClue: "Sau mạo từ 'a' và tính từ 'nuclear' cần danh từ đếm được số ít chỉ lò phản ứng hạt nhân.",
        variants: [
          { form: "reactor", pos: "sing. n.", label: "reactor (Danh từ lò phản ứng hạt nhân số ít)", isCorrect: true },
          { form: "reactors", pos: "pl. n.", label: "reactors (Danh từ các lò phản ứng số nhiều)", isCorrect: false },
          { form: "reaction", pos: "n.", label: "reaction (Danh từ phản ứng hóa học/sinh học)", isCorrect: false }
        ]
      },
      {
        id: "u16_b7",
        num: 7,
        rootWord: "harness",
        category: "Energy Exploitation",
        targetForm: "harness",
        grammarClue: "Cấu trúc 'choose to + V(infinitive)' cần động từ nguyên mẫu mang nghĩa khai thác, chế ngự năng lượng.",
        variants: [
          { form: "harness", pos: "base v.", label: "harness (Động từ nguyên mẫu khai thác năng lượng)", isCorrect: true },
          { form: "harnessing", pos: "gerund", label: "harnessing (Việc khai thác năng lượng)", isCorrect: false },
          { form: "harnessed", pos: "past part.", label: "harnessed (Được khai thác)", isCorrect: false }
        ]
      },
      {
        id: "u16_b8",
        num: 8,
        rootWord: "secure",
        category: "National Strategy",
        targetForm: "security",
        grammarClue: "Cụm danh từ 'national energy security' chỉ an ninh năng lượng quốc gia.",
        variants: [
          { form: "security", pos: "uncount n.", label: "security (Danh từ an ninh năng lượng)", isCorrect: true },
          { form: "securely", pos: "adv.", label: "securely (Phó từ một cách an toàn/chắc chắn)", isCorrect: false },
          { form: "securing", pos: "gerund", label: "securing (Hành động bảo đảm)", isCorrect: false }
        ]
      },
      {
        id: "u16_b9",
        num: 9,
        rootWord: "subsidize",
        category: "Government Policy",
        targetForm: "subsidize",
        grammarClue: "Sau trợ động từ khuyết thiếu 'must heavily' cần động từ nguyên thể chỉ chính sách tài trợ ngân sách.",
        variants: [
          { form: "subsidize", pos: "base v.", label: "subsidize (Động từ nguyên mẫu trợ cấp/tài trợ)", isCorrect: true },
          { form: "subsidies", pos: "pl. n.", label: "subsidies (Danh từ các khoản trợ cấp)", isCorrect: false },
          { form: "subsidized", pos: "past part.", label: "subsidized (Được trợ cấp)", isCorrect: false }
        ]
      },
      {
        id: "u16_b10",
        num: 10,
        rootWord: "sustain",
        category: "Future Ecology",
        targetForm: "sustainable",
        grammarClue: "Sau phó từ 'genuinely' và trước danh từ 'energy paradigm' cần tính từ chỉ tính bền vững sinh thái.",
        variants: [
          { form: "sustainable", pos: "adj.", label: "sustainable (Tính từ bền vững lâu dài)", isCorrect: true },
          { form: "sustainability", pos: "n.", label: "sustainability (Danh từ tính bền vững)", isCorrect: false },
          { form: "sustainably", pos: "adv.", label: "sustainably (Phó từ một cách bền vững)", isCorrect: false }
        ]
      }
    ],
    wordArsenal: [
      { root: "radioactive", pos: "adj.", vi: "Mang tính phóng xạ độc hại", cat: "Nuclear" },
      { root: "catastrophe", pos: "n.", vi: "Thảm họa nghiêm trọng, sự cố thảm khốc", cat: "Safety" },
      { root: "meltdown", pos: "n.", vi: "Sự cố tan chảy vùng lõi hạt nhân", cat: "Accidents" },
      { root: "deplete", pos: "v.", vi: "Làm cạn kiệt, vơi giảm nguồn tài nguyên", cat: "Resources" },
      { root: "shortage", pos: "n.", vi: "Sự khan hiếm, thiếu hụt nguồn cung", cat: "Economy" },
      { root: "reactor", pos: "n.", vi: "Lò phản ứng hạt nhân chuyên dụng", cat: "Technology" },
      { root: "harness", pos: "v.", vi: "Khai thác và chế ngự nguồn năng lượng", cat: "Engineering" },
      { root: "secure", pos: "adj./v.", vi: "An ninh, bảo đảm nguồn cung (security)", cat: "Policy" },
      { root: "subsidize", pos: "v.", vi: "Trợ cấp kinh phí từ ngân sách nhà nước", cat: "Economics" },
      { root: "sustain", pos: "v.", vi: "Duy trì, phát triển bền vững (sustainable)", cat: "Ecology" }
    ],
    xrayHighlights: {
      thesis: [
        "In this essay, I will examine both perspectives before arguing that modern nuclear technology, when bolstered by next-generation safety standards, represents an indispensable pillar of our ecological salvation.",
        "Only through such technologically rigorous approaches can human civilization construct a genuinely sustainable energy paradigm capable of powering future generations without destabilizing the global biosphere."
      ],
      cohesion: [
        "In an epoch fraught with escalating climatic upheaval and the impending exhaustion of conventional hydrocarbons",
        "Opponents of nuclear expansion raise legitimate concerns regarding",
        "Chief among these is the unresolved conundrum of",
        "Furthermore, history has demonstrated that even the most meticulously engineered facilities remain vulnerable",
        "Notwithstanding these undeniable hazards, nuclear power remains an irreplaceable bulwark against",
        "Unlike intermittent solar and wind installations, which depend heavily on",
        "In conclusion, while concerns surrounding hazardous waste and operational safety are well-founded",
        "Forward-thinking governments should not discard atomic power; rather, they must"
      ],
      lexical: [
        "impending exhaustion of conventional hydrocarbons",
        "zero-carbon baseload energy",
        "radioactive contamination",
        "subterranean repositories",
        "core meltdown",
        "relentless depletion of petroleum reserves",
        "intermittent solar and wind installations",
        "nuclear reactor",
        "national energy security",
        "sustainable energy paradigm"
      ]
    }
  },
  lexicon_notes: {
    deplete: {
      word: "deplete",
      ipa: "/dɪˈpliːt/",
      pos: "verb",
      def_en: "To reduce something in size or amount, especially finite natural resources, fuel reserves, or financial assets.",
      def_vi: "Làm cạn kiệt, vơi giảm nghiêm trọng nguồn cung hoặc trữ lượng tài nguyên thiên nhiên.",
      collocations: "deplete natural resources, deplete fossil fuel reserves, severely deplete supplies",
      example: "Excessive industrial manufacturing threatens to severely deplete underground water tables and fossil fuel reserves.",
      ielts_tip: "'deplete natural resources' là collocation Band 8.0 cực chuẩn cho các bài viết bàn về khủng hoảng môi trường và cạn kiệt tài nguyên."
    },
    exhaust: {
      word: "exhaust",
      ipa: "/ɪɡˈzɔːst/",
      pos: "verb",
      def_en: "To completely use up a limited supply of something until nothing remains; to tire out completely.",
      def_vi: "Dùng hết sạch, vắt kiệt hoàn toàn không còn gì; làm kiệt quệ sức lực.",
      collocations: "exhaust supplies, exhaust all avenues, exhaust planetary resources",
      example: "Developing nations risk exhausting their commercial oil deposits within four decades if current consumption patterns persist.",
      ielts_tip: "Phân biệt 'exhaust resources' (dùng cạn kiệt tài nguyên) và 'exhaust fumes' (khí thải động cơ xe cộ xả ra đường phố)."
    },
    fossil: {
      word: "fossil",
      ipa: "/ˈfɒs.əl/",
      pos: "noun / adjective",
      def_en: "A fuel such as coal, oil, or natural gas that is formed in the earth from dead plant or animal remains over millions of years.",
      def_vi: "Hóa thạch; nhiên liệu hóa thạch hình thành từ tàn tích sinh vật triệu năm dưới áp suất địa chất.",
      collocations: "fossil fuels, fossil fuel combustion, phase out fossil fuels",
      example: "International climate treaties urge industrialized countries to phase out fossil fuels in favor of wind and solar power.",
      ielts_tip: "Luôn dùng thuật ngữ học thuật 'combustion of fossil fuels' thay vì chỉ dùng 'burning oil and coal' để tối ưu điểm Lexical Resource."
    },
    synthetic: {
      word: "synthetic",
      ipa: "/sɪnˈθet.ɪk/",
      pos: "adjective",
      def_en: "Created by chemical synthesis rather than of natural origin; artificially produced.",
      def_vi: "Nhân tạo, được tổng hợp bằng phản ứng hóa sinh nhân tạo mô phỏng sản phẩm tự nhiên.",
      collocations: "synthetic fuels, synthetic chemicals, synthetic hydrocarbons",
      example: "Aviation engineers are testing synthetic kerosene synthesized from captured atmospheric carbon dioxide and hydrogen.",
      ielts_tip: "'synthetic fuels' (nhiên liệu nhân tạo/nhiên liệu tổng hợp) là giải pháp trung hòa carbon đột phá hay gặp trong các bài đọc IELTS Reading Khoa học."
    },
    nuclear: {
      word: "nuclear",
      ipa: "/ˈnjuː.kli.ər/",
      pos: "adjective",
      def_en: "Relating to the energy released during atomic fission or fusion, or involving atomic weaponry and energy generation.",
      def_vi: "Thuộc về hạt nhân, điện hạt nhân hoặc năng lượng phát ra từ tâm nguyên tử.",
      collocations: "nuclear power, nuclear energy, nuclear waste, nuclear proliferation",
      example: "France currently relies on nuclear power stations for more than seventy percent of its domestic electricity generation.",
      ielts_tip: "Lưu ý phát âm chuẩn là /ˈnjuː.kli.ər/ (tránh lỗi phổ biến /ˈnuː.kjə.lər/ khi làm bài thi IELTS Speaking)."
    },
    reactor: {
      word: "reactor",
      ipa: "/riˈæk.tər/",
      pos: "noun",
      def_en: "A robust apparatus in which a nuclear fission chain reaction is initiated, maintained, and controlled to produce usable heat.",
      def_vi: "Lò phản ứng hạt nhân, nơi diễn ra và kiểm soát an toàn chuỗi phản ứng phân hạch để phát nhiệt lượng.",
      collocations: "nuclear reactor, reactor core, decommission a reactor, modular reactor",
      example: "Technicians inserted boron control rods into the reactor core to suppress excessive thermal surges.",
      ielts_tip: "'small modular reactors' (lò phản ứng hạt nhân module quy mô nhỏ) là từ vựng thời sự rất được đánh giá cao trong Band 8.5."
    },
    blackout: {
      word: "blackout",
      ipa: "/ˈblæk.aʊt/",
      pos: "noun",
      def_en: "A complete failure of the electrical power supply that causes an entire town or region to lose lighting and power.",
      def_vi: "Sự cố mất điện diện rộng, sự cố cắt điện hoàn toàn cả một thành phố hay vùng lãnh thổ.",
      collocations: "rolling blackouts, suffer a blackout, widespread power blackout",
      example: "Record-breaking summer heatwaves overwhelmed electrical transmission lines, plunging the capital into rolling blackouts.",
      ielts_tip: "'rolling blackouts' (mất điện luân phiên có chủ đích nhằm giải tỏa áp lực lưới điện) là cụm từ diễn đạt chuẩn mực cho Task 2."
    },
    shortage: {
      word: "shortage",
      ipa: "/ˈʃɔː.tɪdʒ/",
      pos: "noun",
      def_en: "A situation where there is not enough of something that people need, such as food, electricity, or petroleum.",
      def_vi: "Sự khan hiếm, thiếu hụt nguồn cung cấp hàng hóa hoặc nhiên liệu thiết yếu.",
      collocations: "acute fuel shortages, electricity shortage, suffer chronic shortages",
      example: "International shipping blockades triggered an acute fuel shortage that left gas stations dry and grounded airlines.",
      ielts_tip: "Thường đi kèm tính từ: 'acute shortage' (thiếu hụt khẩn cấp, gay gắt) hoặc 'chronic shortage' (thiếu hụt kinh niên, dai dẳng)."
    },
    reserve: {
      word: "reserve",
      ipa: "/rɪˈzɜːv/",
      pos: "noun",
      def_en: "A known supply of a natural commodity such as coal, oil, or minerals that is known to exist and can be commercially extracted.",
      def_vi: "Trữ lượng khoáng sản dự trữ; nguồn dầu mỏ dự trữ chiến lược của quốc gia.",
      collocations: "oil reserves, strategic petroleum reserves, proven hydrocarbon reserves",
      example: "The government decided to tap into its strategic oil reserves to curb escalating retail gasoline costs.",
      ielts_tip: "Luôn dùng dạng số nhiều 'proven reserves' (trữ lượng đã được kiểm chứng) trong các bài viết phân tích địa chính trị và tài nguyên."
    },
    surplus: {
      word: "surplus",
      ipa: "/ˈsɜː.pləs/",
      pos: "noun / adjective",
      def_en: "An amount of something that is more than what is needed; excess of production or supply over consumption.",
      def_vi: "Số lượng dôi thừa, thặng dư vượt quá nhu cầu tiêu dùng thông thường.",
      collocations: "energy surplus, budget surplus, export surplus electricity",
      example: "During windy coastal nights, offshore turbine farms produce an energy surplus that is pumped into battery storage facilities.",
      ielts_tip: "Trái nghĩa với 'deficit' (thâm hụt) và 'shortage' (thiếu hụt); 'export surplus clean energy' là giải pháp kinh tế tuyệt vời."
    },
    subsidize: {
      word: "subsidize",
      ipa: "/ˈsʌb.sɪ.daɪz/",
      pos: "verb",
      def_en: "To provide financial support to an industry, enterprise, or public service to keep prices affordable and foster growth.",
      def_vi: "Trợ cấp, bao cấp hoặc tài trợ một phần chi phí từ ngân sách nhà nước.",
      collocations: "subsidize renewable energy, heavily subsidize, government-subsidized tariffs",
      example: "Progressive states heavily subsidize residential rooftop solar installations to lessen dependency on coal-fired grids.",
      ielts_tip: "Danh từ là 'subsidy' (số nhiều: 'subsidies'). Thường kết hợp với trạng từ 'heavily subsidize'."
    },
    fission: {
      word: "fission",
      ipa: "/ˈfɪʃ.ən/",
      pos: "noun",
      def_en: "The splitting of an atomic nucleus resulting in the release of large amounts of thermal energy.",
      def_vi: "Hiện tượng phân hạch hạt nhân, bẻ gãy hạt nhân nặng để giải phóng nhiệt lượng cực đại.",
      collocations: "nuclear fission, fission chain reaction, fission fragments",
      example: "Conventional nuclear power reactors rely on the controlled fission of uranium-235 isotopes.",
      ielts_tip: "Phân biệt rõ 'fission' (phân hạch - chia tách hạt nhân uranium) và 'fusion' (nhiệt hạch - tổng hợp hạt nhân hydro)."
    },
    fusion: {
      word: "fusion",
      ipa: "/ˈfjuː.ʒən/",
      pos: "noun",
      def_en: "A nuclear reaction in which light atomic nuclei fuse to form a heavier nucleus, releasing immense amounts of clean energy.",
      def_vi: "Hiện tượng nhiệt hạch, phản ứng tổng hợp hạt nhân mô phỏng mặt trời sản sinh năng lượng sạch.",
      collocations: "nuclear fusion, fusion reactor, fusion energy breakthrough",
      example: "Physicists celebrated a breakthrough in magnetic confinement fusion that achieved net positive energy output.",
      ielts_tip: "Được mệnh danh là 'the holy grail of clean energy' (chén thánh của năng lượng sạch) trong các bài viết IELTS band cao."
    },
    radioactive: {
      word: "radioactive",
      ipa: "/ˌreɪ.di.əʊˈæk.tɪv/",
      pos: "adjective",
      def_en: "Giving off harmful ionizing radiation resulting from the spontaneous decay of unstable atomic nuclei.",
      def_vi: "Mang tính phóng xạ, phát ra tia bức xạ ion hóa nguy hiểm cho sinh vật sống.",
      collocations: "radioactive waste, radioactive contamination, radioactive fallout",
      example: "Encapsulating high-level radioactive waste in vitrified glass casks ensures radiation containment for millennia.",
      ielts_tip: "Luôn dùng cụm 'dispose of radioactive waste' (xử lý chất thải phóng xạ) hoặc 'radioactive fallout' (bụi phóng xạ sau tai nạn)."
    },
    meltdown: {
      word: "meltdown",
      ipa: "/ˈmelt.daʊn/",
      pos: "noun",
      def_en: "A severe accident in a nuclear reactor in which the core overheats and the nuclear fuel melts, risking atmospheric release.",
      def_vi: "Sự cố nóng chảy vùng lõi hạt nhân do hệ thống làm mát bị phá hủy hoàn toàn.",
      collocations: "nuclear meltdown, core meltdown, catastrophic meltdown",
      example: "Damage to cooling water pumps caused a partial core meltdown that released radioactive vapor into the atmosphere.",
      ielts_tip: "Trong kinh tế học, 'meltdown' còn được dùng ẩn dụ để chỉ sự sụp đổ dây chuyền của thị trường tài chính (financial meltdown)."
    },
    grid: {
      word: "grid",
      ipa: "/ɡrɪd/",
      pos: "noun",
      def_en: "A nationwide network of interconnected cables and substations through which electricity is distributed from plants to consumers.",
      def_vi: "Mạng lưới truyền tải và phân phối điện năng trên quy mô quốc gia hoặc khu vực.",
      collocations: "the national electricity grid, power grid, grid reliability, modernize the grid",
      example: "Integrating intermittent offshore wind farms requires significant public investments to modernize the national power grid.",
      ielts_tip: "'off-grid' (sống tự cấp tự túc không phụ thuộc vào điện lưới quốc gia) là thuật ngữ thời thượng về lối sống xanh bền vững."
    },
    emission: {
      word: "emission",
      ipa: "/iˈmɪʃ.ən/",
      pos: "noun",
      def_en: "The production and discharge of noxious gases or radiation into the atmosphere by industrial activities.",
      def_vi: "Sự phát thải, lượng khí thải hoặc chất phóng xạ xả ra môi trường xung quanh.",
      collocations: "carbon emissions, greenhouse gas emissions, net-zero emissions, curb emissions",
      example: "Expanding nuclear generating capacity allows heavily industrialized countries to slash carbon emissions without curbing factory productivity.",
      ielts_tip: "Thường dùng ở dạng số nhiều 'emissions'. Kết hợp với động từ mạnh: 'curtail / slash / curb emissions'."
    },
    consumption: {
      word: "consumption",
      ipa: "/kənˈsʌmp.ʃən/",
      pos: "noun",
      def_en: "The amount of fuel, energy, or resource that is used up by human activity or industrial machinery.",
      def_vi: "Sự tiêu thụ, mức độ tiêu hao năng lượng, tài nguyên hoặc nhiên liệu.",
      collocations: "energy consumption, fossil fuel consumption, curb excessive consumption",
      example: "Metropolitan megacities are responsible for over seventy percent of total global electricity consumption.",
      ielts_tip: "Kết hợp với 'curtail excessive energy consumption' (cắt giảm mức tiêu thụ năng lượng thái quá) trong phần Solutions của Task 2."
    }
  }
};
