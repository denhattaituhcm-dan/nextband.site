import { CambridgeUnitData } from "./types";

export const unit09Data: CambridgeUnitData = {
  meta: {
    unit: 9,
    title: "THE NATURAL WORLD: WILDLIFE, ECOSYSTEMS & AGRICULTURE",
    subTitle: "Thiên nhiên hoang dã, Đa dạng sinh học, Môi trường sống & Nông nghiệp",
    book: "Cambridge Vocabulary for IELTS - Unit 9 (The Natural World)",
    cefr: "B2 - C1 (IELTS 6.5 - 8.5)",
    totalStages: 3,
    speedGoalWpm: 45,
    paperSpeedMultiplier: "7.0x"
  },
  stage1_magnets: [
    {
      id: "s1_u9_m1",
      sentenceBefore: "Due to relentless poaching and catastrophic deforestation, the Javan rhinoceros is now classified as a critically",
      sentenceAfter: "species with fewer than eighty individuals surviving in the wild.",
      target: "endangered",
      options: [
        {
          word: "vulnerable",
          pos: "adj.",
          hint: "Dễ bị tổn thương, có nguy cơ nhưng ở mức độ thấp hơn endangered theo Sách Đỏ IUCN.",
          explanation: "'vulnerable' xếp ở mức nguy cấp thấp hơn 'endangered'. Với số lượng dưới 80 cá thể, loài này bắt buộc phải được xếp loại 'critically endangered'."
        },
        {
          word: "endangered",
          pos: "adj.",
          hint: "Có nguy cơ tuyệt chủng rất cao trong tự nhiên do số lượng cá thể suy giảm nghiêm trọng.",
          explanation: "Chính xác! 'endangered species / critically endangered' là thuật ngữ sinh học kinh điển để chỉ các loài đứng trước nguy cơ xóa sổ hoàn toàn."
        },
        {
          word: "threatened",
          pos: "adj.",
          hint: "Bị đe dọa (thuật ngữ bao trùm chung cho cả ba mức vulnerable, endangered và critically endangered).",
          explanation: "'threatened' là nhóm phân loại tổng quát bao hàm nhiều mức độ, không diễn tả được tính cấp bách cụ thể bằng 'critically endangered'."
        }
      ],
      ieltsInsight: {
        collocation: "critically endangered species / face extinction / on the brink of extinction",
        bandScore: "Band 8.0",
        synonyms: ["imperiled species", "species on the verge of extinction", "severely threatened fauna"],
        academicTip: "Thay vì viết 'animals that may die out', hãy dùng 'critically endangered species pushed to the brink of extinction'."
      }
    },
    {
      id: "s1_u9_m2",
      sentenceBefore: "The drainage of peat swamp forests inflicts irreparable damage on the natural",
      sentenceAfter: "of orangutans, depriving them of canopy shelter and fruit supplies.",
      target: "habitat",
      options: [
        {
          word: "environment",
          pos: "n.",
          hint: "Môi trường sống tổng quát bao gồm không khí, nước, đất và cả hoàn cảnh xã hội.",
          explanation: "'environment' mang nghĩa rộng lớn về môi trường tự nhiên/xã hội toàn cầu, không phải sinh cảnh cụ thể của một loài thú hoang dã."
        },
        {
          word: "habitat",
          pos: "n.",
          hint: "Môi trường sống tự nhiên, sinh cảnh đặc trưng cung cấp thức ăn và nơi trú ẩn cho một loài sinh vật.",
          explanation: "Chính xác! 'natural habitat / habitat destruction' (môi trường sống tự nhiên) là thuật ngữ sinh thái học chuẩn xác nhất."
        },
        {
          word: "ecosystem",
          pos: "n.",
          hint: "Hệ sinh thái, một hệ thống tương tác phức hợp giữa quần xã sinh vật và môi trường vô sinh.",
          explanation: "'ecosystem' là hệ thống tương tác giữa các loài và môi trường vô sinh, không dùng với sở hữu cách 'natural ecosystem of orangutans'."
        }
      ],
      ieltsInsight: {
        collocation: "natural habitat / habitat destruction / habitat fragmentation",
        bandScore: "Band 7.5+",
        synonyms: ["native dwelling", "ecological niche", "natural biome"],
        academicTip: "Luôn dùng 'habitat destruction / habitat loss' trong các bài luận về bảo vệ động vật hoang dã."
      }
    },
    {
      id: "s1_u9_m3",
      sentenceBefore: "To combat worsening desertification, agronomists are training smallholders to",
      sentenceAfter: "drought-resistant millet and sorghum that thrive in arid soils without synthetic fertilizers.",
      target: "cultivate",
      options: [
        {
          word: "breed",
          pos: "v.",
          hint: "Nhân giống, lai tạo nòi giống động vật qua chọn lọc sinh học (breed cattle/horses).",
          explanation: "'breed' thường áp dụng cho hành vi chăn nuôi hoặc gây giống động vật, không dùng cho việc gieo trồng và chăm bón hoa màu ngũ cốc."
        },
        {
          word: "cultivate",
          pos: "v.",
          hint: "Canh tác, trồng trọt hoa màu lương thực trên đất nông nghiệp.",
          explanation: "Chính xác! 'cultivate crops / cultivate drought-resistant varieties' (canh tác hoa màu) là động từ học thuật chuẩn xác trong nông nghiệp."
        },
        {
          word: "domesticate",
          pos: "v.",
          hint: "Thuần hóa động thực vật hoang dã qua nhiều thế hệ để con người kiểm soát (domesticate wild animals).",
          explanation: "'domesticate' nhấn mạnh quá trình tiến hóa thuần chủng lịch sử loài dại thành loài nuôi gia đình, không chỉ vụ mùa canh tác của người nông dân."
        }
      ],
      ieltsInsight: {
        collocation: "cultivate crops / cultivate arable land / intensive cultivation",
        bandScore: "Band 8.0",
        synonyms: ["grow staple crops", "farm arable produce", "propagate plant varieties"],
        academicTip: "Dùng 'cultivate drought-resistant crops' thay vì 'grow plants' để ghi điểm Lexical Resource C1/C2."
      }
    },
    {
      id: "s1_u9_m4",
      sentenceBefore: "The excessive runoff of nitrates and organophosphate pesticides can completely",
      sentenceAfter: "fragile riparian wetlands, precipitating mass die-offs among sensitive amphibians.",
      target: "devastate",
      options: [
        {
          word: "eradicate",
          pos: "v.",
          hint: "Triệt tiêu, diệt trừ tận gốc một dịch bệnh, mầm bệnh hoặc tệ nạn xã hội (eradicate malaria).",
          explanation: "'eradicate' mang nghĩa tiêu diệt sạch mầm bệnh hay loài gây hại (eradicate pests), không dùng với tân ngữ là vùng đất ngập nước tự nhiên 'wetlands'."
        },
        {
          word: "devastate",
          pos: "v.",
          hint: "Tàn phá, hủy hoại nghiêm trọng trên quy mô lớn đối với một hệ sinh thái hay vùng cảnh quan.",
          explanation: "Chính xác! 'devastate fragile wetlands / devastate natural habitats' (tàn phá nặng nề) là cụm từ kết hợp học thuật tự nhiên và giàu tính gợi hình."
        },
        {
          word: "deteriorate",
          pos: "v.",
          hint: "Suy giảm chất lượng, dần trở nên tồi tệ hơn (nội động từ, không nhận tân ngữ trực tiếp).",
          explanation: "'deteriorate' là nội động từ (intransitive verb: e.g. wetlands deteriorate), không thể dùng dạng ngoại động từ 'deteriorate fragile wetlands'."
        }
      ],
      ieltsInsight: {
        collocation: "devastate fragile ecosystems / devastating ecological impact / devastate wetlands",
        bandScore: "Band 7.5+",
        synonyms: ["wreak havoc on", "inflict catastrophic damage upon", "lay waste to"],
        academicTip: "'devastate fragile ecosystems' và 'wreak havoc on native biodiversity' là những collocation đắt giá cho chủ đề sinh thái."
      }
    },
    {
      id: "s1_u9_m5",
      sentenceBefore: "The remote Galápagos archipelago harbors exceptionally rich flora and",
      sentenceAfter: "exhibiting unique adaptations developed over millions of years of isolation.",
      target: "fauna",
      options: [
        {
          word: "beasts",
          pos: "pl. n.",
          hint: "Thú dữ lớn, dã thú (từ ngữ mang màu sắc cổ tích, văn học hoặc huyền bí).",
          explanation: "'beasts' là từ văn học cổ chỉ dã thú to lớn hung tợn, không tạo thành thành ngữ sinh học khoa học chuẩn mực 'flora and fauna'."
        },
        {
          word: "fauna",
          pos: "n.",
          hint: "Hệ động vật của một khu vực địa lý hoặc một kỷ nguyên cụ thể.",
          explanation: "Chính xác! Thành ngữ khoa học song hành 'flora and fauna' (hệ thực vật và hệ động vật) là cặp từ kinh điển và bắt buộc trong văn cảnh này."
        },
        {
          word: "wildlife",
          pos: "n.",
          hint: "Động vật hoang dã nói chung trong tự nhiên (danh từ không đếm được).",
          explanation: "Dù 'wildlife' có nghĩa là giới động vật hoang dã, nhưng thành ngữ cố định chuẩn xác trong sinh học luôn là 'flora and fauna'."
        }
      ],
      ieltsInsight: {
        collocation: "flora and fauna / native flora and fauna / endemic fauna",
        bandScore: "Band 8.0",
        synonyms: ["regional biota", "animal life", "zoological species"],
        academicTip: "Cụm từ song hành 'native flora and fauna' (hệ động thực vật bản địa) là điểm sáng nâng điểm Lexical Resource thay cho 'plants and animals'."
      }
    },
    {
      id: "s1_u9_m6",
      sentenceBefore: "The uncontrolled proliferation of foreign cane toads has inflicted heavy casualties on",
      sentenceAfter: "reptile species that have inhabited the Australian continent for millennia.",
      target: "indigenous",
      options: [
        {
          word: "inborn",
          pos: "adj.",
          hint: "Bẩm sinh, có từ lúc lọt lòng ở sinh vật (inborn instinct/talent).",
          explanation: "'inborn' mô tả bản năng hoặc đặc tính tự nhiên có từ lúc sinh ra, không dùng để định danh nguồn gốc phân bố địa lý của loài sinh vật."
        },
        {
          word: "indigenous",
          pos: "adj.",
          hint: "Bản địa, có nguồn gốc tự nhiên phát sinh tại một vùng đất nhất định chứ không do con người du nhập.",
          explanation: "Chính xác! 'indigenous species / indigenous wildlife' (loài bản địa) là thuật ngữ sinh thái học đối lập trực tiếp với loài ngoại lai."
        },
        {
          word: "exotic",
          pos: "adj.",
          hint: "Ngoại lai, du nhập từ xứ lạ hoặc vùng nhiệt đới xa xôi (exotic species/pets).",
          explanation: "'exotic' mang nghĩa loài ngoại lai từ vùng khác tới, trái ngược hoàn toàn với bối cảnh loài bò sát đã sinh sống hàng thiên niên kỷ tại bản xứ."
        }
      ],
      ieltsInsight: {
        collocation: "indigenous species / indigenous flora and fauna / indigenous biodiversity",
        bandScore: "Band 8.0",
        synonyms: ["native species", "endemic wildlife", "aboriginal organisms"],
        academicTip: "Sự đối lập giữa 'indigenous flora/fauna' (sinh vật bản địa) và 'invasive exotic species' (sinh vật ngoại lai xâm lấn) là luận cứ sắc bén trong IELTS."
      }
    },
    {
      id: "s1_u9_m7",
      sentenceBefore: "Prominent environmental agencies urge national governments to enact stringent wildlife",
      sentenceAfter: "policies that balance ethical eco-tourism with the ecological integrity of national reserves.",
      target: "conservation",
      options: [
        {
          word: "reservation",
          pos: "n.",
          hint: "Sự đặt trước phòng khách sạn/vé máy bay hoặc khu bảo tồn dành riêng cho thổ dân (Indian reservation).",
          explanation: "'reservation' chỉ việc đặt chỗ hoặc khu cư trú thổ dân, không phải thuật ngữ chỉ công tác quản lý bảo vệ sinh thái học."
        },
        {
          word: "conservation",
          pos: "n.",
          hint: "Sự bảo tồn và quản lý khôn ngoan tài nguyên thiên nhiên, gắn liền với phát triển bền vững.",
          explanation: "Chính xác! 'wildlife conservation / marine conservation' nhấn mạnh việc quản lý bảo vệ sinh thái kết hợp sử dụng hợp lý bền vững (sustainable use)."
        },
        {
          word: "preservation",
          pos: "n.",
          hint: "Sự giữ gìn nguyên trạng tuyệt đối, nghiêm cấm mọi sự can thiệp hoặc khai thác của con người.",
          explanation: "'preservation' hướng đến việc đóng băng và bảo tồn nguyên vẹn không cho phép khai thác du lịch sinh thái, không khớp với ngữ cảnh 'balance eco-tourism'."
        }
      ],
      ieltsInsight: {
        collocation: "wildlife conservation / conservation efforts / conservationist programs",
        bandScore: "Band 8.0",
        synonyms: ["ecological stewardship", "environmental protection", "biodiversity preservation"],
        academicTip: "Phân biệt 'conservation' (bảo tồn và khai thác bền vững thông minh) và 'preservation' (giữ nguyên vẹn 100% không đụng chạm)."
      }
    },
    {
      id: "s1_u9_m8",
      sentenceBefore: "Reintroducing the gray wolf restored the balance of the ecosystem, proving that an apex",
      sentenceAfter: "plays an indispensable role in regulating herbivore populations and rejuvenating riparian forests.",
      target: "predator",
      options: [
        {
          word: "herbivore",
          pos: "n.",
          hint: "Động vật ăn cỏ, chỉ ăn thực vật như hươu nai, bò, ngựa.",
          explanation: "'herbivore' là sinh vật ăn thực vật, hoàn toàn trái ngược với vai trò săn bắt điều hòa số lượng của loài sói xám."
        },
        {
          word: "predator",
          pos: "n.",
          hint: "Động vật săn mồi ăn thịt, kiểm soát các loài khác trong cấu trúc chuỗi thức ăn.",
          explanation: "Chính xác! 'apex predator' (thú săn mồi đỉnh cao / loài săn mồi đầu chuỗi) là thuật ngữ sinh thái học để chỉ những loài thú đứng đầu mạng lưới dinh dưỡng."
        },
        {
          word: "carnivore",
          pos: "n.",
          hint: "Động vật ăn thịt nói chung (phân loại theo chế độ ăn uống sinh học).",
          explanation: "'carnivore' mô tả phân loại tập tính ăn uống. Trong cấu trúc sinh thái và tương tác chuỗi thức ăn, thuật ngữ sinh học chính xác là 'apex predator'."
        }
      ],
      ieltsInsight: {
        collocation: "apex predator / top predator / predatory habits",
        bandScore: "Band 8.0",
        synonyms: ["top predator", "keystone predator", "dominant carnivore"],
        academicTip: "'apex predator' (kẻ săn mồi đỉnh chuỗi thức ăn) là thuật ngữ Band 8.5 cực đắt giá khi bàn về vai trò cân bằng sinh thái."
      }
    }
  ],
  stage2_timeline: [
    {
      milestoneId: "u9_t1",
      age: "540 Triệu Năm Trước",
      title: "Bùng Nổ Kỷ Cambri & Khởi Nguồn Sinh Giới",
      icon: "sparkles",
      stageTag: "Cambrian Explosion",
      story: "Đại dương nguyên thủy chứng kiến sự bùng nổ kỳ diệu của các dạng sống phức tạp, khai sinh ra nguồn [BLANK] đầu tiên trên hành tinh.",
      storyEn: "The ancient oceans experienced an extraordinary surge of complex multicellular life, giving rise to unprecedented global [BLANK].",
      target: "biodiversity",
      targetVi: "đa dạng sinh học",
      pos: "noun",
      candidates: ["biodiversity", "extinction", "pollution", "urbanization"],
      explanation: "'biodiversity' (đa dạng sinh học) chỉ sự phong phú, muôn màu muôn vẻ của các loài sinh vật, nguồn gen và hệ sinh thái trên Trái Đất."
    },
    {
      milestoneId: "u9_t2",
      age: "350 Triệu Năm Trước",
      title: "Kỷ Than Đá & Thảm Thực Vật Đầm Lầy Khổng Lồ",
      icon: "trees",
      stageTag: "Carboniferous Biome",
      story: "Các cánh rừng đầm lầy nguyên sinh phát triển cực thịnh, bao phủ đất liền bằng tầng [BLANK] rậm rạp làm tăng vọt lượng oxy khí quyển.",
      storyEn: "Towering primeval swamp forests cloaked the supercontinents, generating colossal biomass through luxuriant prehistoric [BLANK].",
      target: "vegetation",
      targetVi: "thảm thực vật",
      pos: "noun",
      candidates: ["vegetation", "concrete", "plastics", "machinery"],
      explanation: "'vegetation' (thảm thực vật) là toàn bộ các loài cây cối và quần thể thực vật bao phủ bề mặt một vùng lãnh thổ."
    },
    {
      milestoneId: "u9_t3",
      age: "66 Triệu Năm Trước",
      title: "Va Chạm Thiên Thạch & Đại Tuyệt Chủng Khủng Long",
      icon: "alert-triangle",
      stageTag: "Cretaceous Mass Extinction",
      story: "Một tiểu hành tinh va chạm dữ dội vào Trái Đất tạo nên mùa đông hạt nhân, đẩy loài khủng long tới bờ vực [BLANK] vĩnh viễn.",
      storyEn: "A massive bolide collision triggered cataclysmic climate cooling, driving non-avian dinosaurs to sudden and total [BLANK].",
      target: "extinction",
      targetVi: "sự tuyệt chủng",
      pos: "noun",
      candidates: ["extinction", "domestication", "cultivation", "propagation"],
      explanation: "'extinction' (sự tuyệt chủng) diễn ra khi toàn bộ cá thể của một loài sinh vật đều chết hết, không còn tồn tại trên Trái Đất."
    },
    {
      milestoneId: "u9_t4",
      age: "Khoảng 10,000 Năm TCN",
      title: "Cách Mạng Đồ Đá Mới & Thuần Hóa Cây Trồng",
      icon: "sprout",
      stageTag: "Agricultural Dawn",
      story: "Tổ tiên loài người chuyển từ săn bắt hái lượm sang [BLANK] các giống ngũ cốc hoang dại tại vùng Lưỡi liềm Màu mỡ.",
      storyEn: "Neolithic humans transformed nomadic foraging into settled agrarian life by learning to [BLANK] wild emmer wheat and barley.",
      target: "cultivate",
      targetVi: "canh tác/trồng trọt",
      pos: "verb",
      candidates: ["cultivate", "devastate", "contaminate", "eradicate"],
      explanation: "'cultivate' (trồng trọt, canh tác) là hành động làm đất, gieo hạt giống và chăm bón hoa màu để thu hoạch lương thực."
    },
    {
      milestoneId: "u9_t5",
      age: "Kỷ Holocene",
      title: "Cân Bằng Sinh Thái & Thú Săn Mồi Đỉnh Cao",
      icon: "shield",
      stageTag: "Apex Predator Dynamics",
      story: "Trong các quần xã tự nhiên hoang dã, mỗi loài thú săn mồi [BLANK] giữ vai trò sống còn trong việc kiểm soát số lượng thú ăn cỏ.",
      storyEn: "Within healthy natural ecosystems, a keystone [BLANK] exerts top-down regulation over grazing herds to sustain pristine forests.",
      target: "predator",
      targetVi: "thú săn mồi",
      pos: "noun",
      candidates: ["predator", "parasite", "pollutant", "herbivore"],
      explanation: "'predator' (động vật săn mồi) đóng vai trò kiểm soát các tầng bậc dinh dưỡng thấp hơn trong chuỗi thức ăn."
    },
    {
      milestoneId: "u9_t6",
      age: "Thế Kỷ XIX – XX",
      title: "Đô Thị Hóa Nông Nghiệp & Mất Môi Trường Sống",
      icon: "flame",
      stageTag: "Habitat Fragmentation",
      story: "Sự khai hoang ồ ạt phục vụ nông nghiệp và công nghiệp đã xé vụn [BLANK] sinh tồn tự nhiên của hàng triệu loài động vật.",
      storyEn: "Rapid industrial logging and cattle ranching severely fragmented the native [BLANK] of countless tropical animal species.",
      target: "habitat",
      targetVi: "môi trường sống tự nhiên",
      pos: "noun",
      candidates: ["habitat", "factory", "metropolis", "atmosphere"],
      explanation: "'habitat' (môi trường sống tự nhiên, sinh cảnh) là không gian tự nhiên cung cấp đầy đủ thức ăn, nước và chỗ ở cho sinh vật hoang dã."
    },
    {
      milestoneId: "u9_t7",
      age: "Cuối Thế Kỷ XX",
      title: "Khủng Hoảng Sinh Vật Xâm Lấn Toàn Cầu",
      icon: "alert-octagon",
      stageTag: "Biological Invasions",
      story: "Thương mại toàn cầu vô tình du nhập các loài dịch hại ngoại lai, đe dọa sinh kế và sự sinh tồn của các sinh vật [BLANK] quý hiếm.",
      storyEn: "Intercontinental shipping inadvertently spread aggressive alien pests, threatening to outcompete and displace [BLANK] wildlife.",
      target: "indigenous",
      targetVi: "thuộc bản địa",
      pos: "adjective",
      candidates: ["indigenous", "synthetic", "artificial", "exotic"],
      explanation: "'indigenous' (bản địa) mô tả các loài động thực vật sinh sống, sinh sôi tự nhiên tại một khu vực qua hàng ngàn năm mà không do con người đưa tới."
    },
    {
      milestoneId: "u9_t8",
      age: "Thế Kỷ XXI Hiện Đại",
      title: "Khung Bảo Tồn Toàn Cầu & Nông Nghiệp Sinh Thái",
      icon: "globe",
      stageTag: "Global Biodiversity Conservation",
      story: "Các công ước quốc tế thúc đẩy các chiến lược [BLANK] thiên nhiên, khôi phục hành lang sinh học và phục hồi đất thoái hóa.",
      storyEn: "Modern environmental treaties mobilize international resources toward comprehensive wildlife [BLANK] and ecological restoration.",
      target: "conservation",
      targetVi: "sự bảo tồn tài nguyên thiên nhiên",
      pos: "noun",
      candidates: ["conservation", "exploitation", "destruction", "eradication"],
      explanation: "'conservation' (sự bảo tồn) là hoạt động quản lý, bảo vệ và khôi phục tài nguyên tự nhiên một cách bền vững."
    }
  ],
  stage3_essay: {
    title: "Biodiversity Loss and Agricultural Expansion: Balancing Global Food Security with Ecological Preservation",
    prompt: "The rapid expansion of agricultural land is one of the leading causes of global biodiversity loss and habitat destruction. Some people believe that clearing land for farming is necessary to feed the growing world population, while others argue that protecting wild habitats and natural ecosystems must take precedence. Discuss both views and give your own opinion.",
    paragraphs: [
      {
        pIndex: 1,
        type: "Introduction",
        text: "As the global human population surges toward ten billion, the tension between food production and nature conservation has escalated into an acute global crisis. While proponents of agrarian development assert that expanding arable farmland is indispensable to prevent catastrophic famine, environmental scientists warn that the unchecked conversion of wild lands threatens the very biomes that sustain terrestrial life. In my view, prioritizing unconditional agricultural encroachment is short-sighted and self-defeating; instead, humanity must adopt regenerative farming techniques that safeguard wild habitats without compromising global food security."
      },
      {
        pIndex: 2,
        type: "Body 1 (The Imperative of Agricultural Expansion for Global Food Security)",
        text: "On the one hand, advocates of agricultural growth argue that feeding an expanding populace demands an urgent increase in food output. In many developing regions across Latin America and Sub-Saharan Africa, clearing virgin forests to [BLANK_1] cash crops such as soybeans, oil palms, and maize is viewed as an unavoidable economic necessity. Proponents contend that hunger cannot be alleviated without maximizing crop yields and raising livestock. However, this intensive land conversion often leads to catastrophic soil [BLANK_2], stripping topsoil of vital nutrients and rendering fields barren after only a few harvest cycles. Furthermore, the ubiquitous spraying of chemical agrochemicals and pesticides can [BLANK_3] surrounding wetlands, poisoning rivers and wiping out non-target aquatic species."
      },
      {
        pIndex: 3,
        type: "Body 2 (The Ecological Catastrophe of Habitat Loss and Need for Sustainable Conservation)",
        text: "On the other hand, the relentless destruction of wilderness imposes an existential threat to planetary health and natural ecosystems. When ancient peatlands and tropical rainforests are cleared, the natural [BLANK_4] of countless wildlife species is irrevocably fragmented. This fragmentation pushes thousands of vulnerable organisms onto the list of critically [BLANK_5] species, while driving keystone organisms to total [BLANK_6]. The loss of an apex [BLANK_7]—such as wolves or tigers—triggers trophic cascades that destabilize entire ecosystems and decimate plant communities. Moreover, the replacement of rich native [BLANK_8] and complex forest canopies with vast agricultural monocultures dramatically accelerates global [BLANK_9] loss, undermining natural pollination and carbon sequestration services."
      },
      {
        pIndex: 4,
        type: "Conclusion & Sustainable Synthesis",
        text: "In conclusion, clearing pristine wilderness for agrarian acreage represents a perilous ecological gamble that ultimately threatens human survival. Sustainable food security should not be achieved through territorial conquest over nature, but rather through technological innovation, precision farming, and aggressive wildlife [BLANK_10] programs that preserve our biosphere for generations to come."
      }
    ],
    blanks: [
      {
        id: "u9_b1",
        num: 1,
        rootWord: "cultivate",
        category: "Agricultural Practices",
        targetForm: "cultivate",
        grammarClue: "Sau tiểu từ 'to' cần động từ nguyên mẫu chỉ hành vi gieo trồng các loại cây hoa màu thương mại.",
        variants: [
          { form: "cultivate", pos: "base v.", label: "cultivate (Động từ nguyên mẫu canh tác/gieo trồng)", isCorrect: true },
          { form: "cultivation", pos: "n.", label: "cultivation (Danh từ sự canh tác)", isCorrect: false },
          { form: "cultivated", pos: "adj./v-ed", label: "cultivated (Dạng quá khứ/tính từ được canh tác)", isCorrect: false }
        ]
      },
      {
        id: "u9_b2",
        num: 2,
        rootWord: "deteriorate",
        category: "Soil Degradation",
        targetForm: "deterioration",
        grammarClue: "Sau danh từ 'soil' cần danh từ kết hợp 'soil deterioration' để chỉ hiện tượng thoái hóa đất canh tác nghiêm trọng.",
        variants: [
          { form: "deterioration", pos: "n.", label: "deterioration (Danh từ sự thoái hóa/suy giảm chất lượng)", isCorrect: true },
          { form: "deteriorate", pos: "base v.", label: "deteriorate (Động từ suy thoái)", isCorrect: false },
          { form: "deteriorating", pos: "adj./v-ing", label: "deteriorating (Tính từ đang xấu đi)", isCorrect: false }
        ]
      },
      {
        id: "u9_b3",
        num: 3,
        rootWord: "devastate",
        category: "Ecological Destruction",
        targetForm: "devastate",
        grammarClue: "Sau động từ khuyết thiếu 'can' cần động từ nguyên mẫu không 'to' diễn tả việc tàn phá các vùng đất ngập nước.",
        variants: [
          { form: "devastate", pos: "base v.", label: "devastate (Động từ nguyên mẫu tàn phá/hủy hoại)", isCorrect: true },
          { form: "devastation", pos: "n.", label: "devastation (Danh từ sự tàn phá)", isCorrect: false },
          { form: "devastating", pos: "adj.", label: "devastating (Tính từ mang tính tàn phá)", isCorrect: false }
        ]
      },
      {
        id: "u9_b4",
        num: 4,
        rootWord: "habitat",
        category: "Natural Environment",
        targetForm: "habitat",
        grammarClue: "Sau tính từ 'natural' cần danh từ số ít chỉ môi trường sống tự nhiên của muôn loài hoang dã.",
        variants: [
          { form: "habitat", pos: "n.", label: "habitat (Danh từ môi trường sống tự nhiên)", isCorrect: true },
          { form: "habitant", pos: "n.", label: "habitant (Cư dân - danh từ chỉ người)", isCorrect: false },
          { form: "habitation", pos: "n.", label: "habitation (Sự cư trú/nhà ở của con người)", isCorrect: false }
        ]
      },
      {
        id: "u9_b5",
        num: 5,
        rootWord: "danger",
        category: "Threatened Status",
        targetForm: "endangered",
        grammarClue: "Cụm học thuật 'critically endangered species' cần tính từ mang nghĩa có nguy cơ tuyệt chủng rất cao đứng trước danh từ 'species'.",
        variants: [
          { form: "endangered", pos: "adj.", label: "endangered (Tính từ có nguy cơ tuyệt chủng)", isCorrect: true },
          { form: "endangerment", pos: "n.", label: "endangerment (Danh từ tình trạng bị đe dọa)", isCorrect: false },
          { form: "endanger", pos: "base v.", label: "endanger (Động từ gây nguy hiểm)", isCorrect: false }
        ]
      },
      {
        id: "u9_b6",
        num: 6,
        rootWord: "extinct",
        category: "Species Loss",
        targetForm: "extinction",
        grammarClue: "Sau giới từ 'to' và tính từ 'total' cần danh từ chỉ sự tuyệt chủng vĩnh viễn (drive species to total extinction).",
        variants: [
          { form: "extinction", pos: "n.", label: "extinction (Danh từ sự tuyệt chủng)", isCorrect: true },
          { form: "extinct", pos: "adj.", label: "extinct (Tính từ đã tuyệt chủng)", isCorrect: false },
          { form: "extinguish", pos: "v.", label: "extinguish (Động từ dập tắt lửa)", isCorrect: false }
        ]
      },
      {
        id: "u9_b7",
        num: 7,
        rootWord: "predator",
        category: "Food Web",
        targetForm: "predator",
        grammarClue: "Cụm danh từ 'apex predator' cần danh từ số ít chỉ động vật săn mồi đầu bảng trong chuỗi dinh dưỡng.",
        variants: [
          { form: "predator", pos: "n.", label: "predator (Danh từ thú săn mồi)", isCorrect: true },
          { form: "predatory", pos: "adj.", label: "predatory (Tính từ mang tính săn mồi)", isCorrect: false },
          { form: "predation", pos: "n.", label: "predation (Danh từ sự săn mồi)", isCorrect: false }
        ]
      },
      {
        id: "u9_b8",
        num: 8,
        rootWord: "vegetate",
        category: "Plant Life",
        targetForm: "vegetation",
        grammarClue: "Sau tính từ 'native' cần danh từ chỉ thảm thực vật bản địa che phủ mặt đất.",
        variants: [
          { form: "vegetation", pos: "uncount n.", label: "vegetation (Danh từ thảm thực vật)", isCorrect: true },
          { form: "vegetative", pos: "adj.", label: "vegetative (Tính từ thực vật/thực vật học)", isCorrect: false },
          { form: "vegetable", pos: "n.", label: "vegetable (Rau củ ăn uống thông thường)", isCorrect: false }
        ]
      },
      {
        id: "u9_b9",
        num: 9,
        rootWord: "diverse",
        category: "Ecological Variety",
        targetForm: "biodiversity",
        grammarClue: "Sau tính từ 'global' đứng trước 'loss' cần danh từ ghép 'biodiversity' tạo thành cụm 'global biodiversity loss' (suy giảm đa dạng sinh học toàn cầu).",
        variants: [
          { form: "biodiversity", pos: "n.", label: "biodiversity (Danh từ đa dạng sinh học)", isCorrect: true },
          { form: "diversify", pos: "v.", label: "diversify (Động từ đa dạng hóa)", isCorrect: false },
          { form: "diversity", pos: "n.", label: "diversity (Danh từ sự phong phú chung chung)", isCorrect: false }
        ]
      },
      {
        id: "u9_b10",
        num: 10,
        rootWord: "conserve",
        category: "Environmental Stewardship",
        targetForm: "conservation",
        grammarClue: "Trong cụm danh từ 'wildlife conservation programs', cần danh từ 'conservation' bổ nghĩa cho 'programs'.",
        variants: [
          { form: "conservation", pos: "n.", label: "conservation (Danh từ sự bảo tồn bền vững)", isCorrect: true },
          { form: "conservative", pos: "adj.", label: "conservative (Tính từ bảo thủ)", isCorrect: false },
          { form: "conserve", pos: "base v.", label: "conserve (Động từ bảo tồn)", isCorrect: false }
        ]
      }
    ],
    wordArsenal: [
      { root: "cultivate", pos: "v.", vi: "Canh tác, trồng trọt hoa màu lương thực", cat: "Agriculture" },
      { root: "deteriorate", pos: "v.", vi: "Suy thoái, thoái hóa dần theo thời gian", cat: "Environment" },
      { root: "devastate", pos: "v.", vi: "Tàn phá, hủy hoại nặng nề trên diện rộng", cat: "Ecology" },
      { root: "habitat", pos: "n.", vi: "Môi trường sống tự nhiên, sinh cảnh", cat: "Ecology" },
      { root: "endanger", pos: "v.", vi: "Gây nguy hiểm, đẩy vào nguy cơ tuyệt chủng", cat: "Conservation" },
      { root: "extinct", pos: "adj.", vi: "Tuyệt chủng, biến mất hoàn toàn", cat: "Biodiversity" },
      { root: "predator", pos: "n.", vi: "Động vật săn mồi, thú ăn thịt", cat: "Zoology" },
      { root: "vegetation", pos: "n.", vi: "Thảm thực vật, quần xã cây cỏ", cat: "Botany" },
      { root: "biodiversity", pos: "n.", vi: "Đa dạng sinh học, tính phong phú sinh giới", cat: "Ecology" },
      { root: "conserve", pos: "v.", vi: "Bảo tồn, gìn giữ bền vững tài nguyên", cat: "Conservation" }
    ],
    xrayHighlights: {
      thesis: [
        "In my view, prioritizing unconditional agricultural encroachment is short-sighted and self-defeating; instead, humanity must adopt regenerative farming techniques that safeguard wild habitats without compromising global food security.",
        "Sustainable food security should not be achieved through territorial conquest over nature, but rather through technological innovation, precision farming, and aggressive wildlife conservation programs that preserve our biosphere for generations to come."
      ],
      cohesion: [
        "As the global human population surges toward ten billion, the tension between food production and nature conservation",
        "On the one hand, advocates of agricultural growth argue that",
        "However, this intensive land conversion often leads to",
        "On the other hand, the relentless destruction of wilderness imposes",
        "Moreover, the replacement of rich native vegetation and complex forest canopies with",
        "In conclusion, clearing pristine wilderness for agrarian acreage represents"
      ],
      lexical: [
        "expanding arable farmland",
        "cultivate cash crops",
        "soil deterioration",
        "devastate fragile wetlands",
        "natural habitat fragmentation",
        "critically endangered species",
        "drive keystone organisms to total extinction",
        "apex predator dynamics",
        "dense native vegetation",
        "global biodiversity loss"
      ]
    }
  },
  lexicon_notes: {
    biodiversity: {
      word: "biodiversity",
      ipa: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/",
      pos: "noun",
      def_en: "The variety of plant and animal life in the world or in a particular habitat, a high level of which is usually considered to be important and desirable.",
      def_vi: "Đa dạng sinh học, sự phong phú muôn loài của động thực vật và hệ sinh thái trong tự nhiên.",
      collocations: "preserve biodiversity, loss of biodiversity, biodiversity hotspot",
      example: "Tropical rainforests harbor immense biodiversity that provides vital medicines and stabilizes climate systems.",
      ielts_tip: "'catastrophic biodiversity loss' là cụm collocation Band 8.5 cực đắt giá cho chủ đề môi trường tự nhiên."
    },
    habitat: {
      word: "habitat",
      ipa: "/ˈhæb.ɪ.tæt/",
      pos: "noun",
      def_en: "The natural home or environment of an animal, plant, or other organism.",
      def_vi: "Môi trường sống tự nhiên, sinh cảnh đặc trưng nơi một loài sinh vật sinh tồn và phát triển.",
      collocations: "natural habitat, habitat destruction, habitat fragmentation",
      example: "Urban encroachment has fragmented the natural habitat of migratory waterfowl.",
      ielts_tip: "Luôn dùng 'loss of native habitat' thay vì cách diễn đạt thông thường 'animals losing their homes'."
    },
    endangered: {
      word: "endangered",
      ipa: "/ɪnˈdeɪn.dʒəd/",
      pos: "adjective",
      def_en: "Seriously at risk of extinction in the wild.",
      def_vi: "Có nguy cơ tuyệt chủng cao, bị đe dọa sinh tồn nghiêm trọng trong môi trường tự nhiên.",
      collocations: "critically endangered, endangered species, endangered wildlife",
      example: "Strict anti-poaching patrols were dispatched to safeguard critically endangered mountain gorillas.",
      ielts_tip: "'critically endangered species' là thuật ngữ phân loại Sách Đỏ IUCN chuẩn mực nhất trong bài thi IELTS."
    },
    extinction: {
      word: "extinction",
      ipa: "/ɪkˈstɪŋk.ʃən/",
      pos: "noun",
      def_en: "The state or process of a species, family, or larger group being or becoming completely wiped out.",
      def_vi: "Sự tuyệt chủng, quá trình một giống loài biến mất hoàn toàn khỏi mặt Trái Đất.",
      collocations: "face extinction, on the brink of extinction, mass extinction",
      example: "Overhunting pushed the dodo bird to total extinction within a single century.",
      ielts_tip: "Cụm 'driven to the verge of extinction' là cấu trúc bị động học thuật rất được giám khảo đánh giá cao."
    },
    cultivate: {
      word: "cultivate",
      ipa: "/ˈkʌl.tɪ.veɪt/",
      pos: "verb",
      def_en: "To prepare and use land for crops or gardening, or to grow crops systematically.",
      def_vi: "Canh tác, gieo trồng hoa màu trên đồng ruộng; hoặc trau dồi phẩm chất/mối quan hệ.",
      collocations: "cultivate crops, cultivate arable land, intensive cultivation",
      example: "Subsistence farmers cultivate drought-resistant pulses to ensure food security during dry spells.",
      ielts_tip: "Dùng 'cultivate crops on arable land' thay thế hoàn hảo cho từ đơn giản 'grow plants on farms'."
    },
    devastate: {
      word: "devastate",
      ipa: "/ˈdev.ə.steɪt/",
      pos: "verb",
      def_en: "To destroy or ruin completely, or to cause severe damage across an area or ecosystem.",
      def_vi: "Tàn phá, hủy hoại nặng nề trên diện rộng đối với một hệ sinh thái hoặc vùng đất.",
      collocations: "devastate ecosystems, devastating impact, devastating wildfires",
      example: "Untreated toxic mine tailings devastated the pristine river ecosystem downstream.",
      ielts_tip: "'wreak devastating effects on local ecology' là cụm C2 cực mạnh dùng để nhấn mạnh hậu quả tàn khốc."
    },
    vegetation: {
      word: "vegetation",
      ipa: "/ˌvedʒ.ɪˈteɪ.ʃən/",
      pos: "noun",
      def_en: "Plants considered collectively, especially those found in a particular area or habitat.",
      def_vi: "Thảm thực vật, toàn bộ các loài cây cối che phủ một vùng đất hoặc hệ sinh thái.",
      collocations: "dense vegetation, lush vegetation, native vegetation",
      example: "Overgrazing by sheep stripped the hillsides of native vegetation, accelerating soil erosion.",
      ielts_tip: "Dùng 'dense native vegetation' thay cho 'many green trees and plants' để ghi điểm từ vựng Task 1 & 2."
    },
    indigenous: {
      word: "indigenous",
      ipa: "/ɪnˈdɪdʒ.ɪ.nəs/",
      pos: "adjective",
      def_en: "Originating or occurring naturally in a particular place; native rather than introduced.",
      def_vi: "Bản địa, có nguồn gốc phát sinh tự nhiên tại địa phương chứ không phải du nhập.",
      collocations: "indigenous species, indigenous flora and fauna, indigenous communities",
      example: "The introduction of feral cats devastated indigenous marsupial populations on the island.",
      ielts_tip: "Từ đối lập xuất sắc của 'invasive' hoặc 'exotic' khi thảo luận về đa dạng sinh thái học."
    },
    conservation: {
      word: "conservation",
      ipa: "/ˌkɒn.səˈveɪ.ʃən/",
      pos: "noun",
      def_en: "The protection and preservation of the natural environment and of wildlife, especially through planned management.",
      def_vi: "Sự bảo tồn và quản lý khôn ngoan, bền vững tài nguyên thiên nhiên và động vật hoang dã.",
      collocations: "wildlife conservation, conservation project, conservation efforts",
      example: "International conservation bodies collaborated to establish protected marine sanctuaries.",
      ielts_tip: "Phân biệt 'conservation' (bảo tồn tài nguyên có kế hoạch quản lý) và 'preservation' (giữ nguyên vẹn 100%)."
    },
    predator: {
      word: "predator",
      ipa: "/ˈpred.ə.tər/",
      pos: "noun",
      def_en: "An animal that naturally preys on other animals for food.",
      def_vi: "Động vật săn mồi, loài thú ăn thịt săn bắt các loài khác trong tự nhiên.",
      collocations: "apex predator, natural predator, predatory behavior",
      example: "Lions serve as the apex predator on the African savanna, culling weak herbivores.",
      ielts_tip: "'apex predator' (thú săn mồi đỉnh cao) là thuật ngữ sinh học kinh điển để giải thích cân bằng chuỗi thức ăn."
    },
    fauna: {
      word: "fauna",
      ipa: "/ˈfɔː.nə/",
      pos: "noun",
      def_en: "The animals of a particular region, habitat, or geological period.",
      def_vi: "Hệ động vật của một khu vực địa lý hoặc một thời kỳ địa chất nhất định.",
      collocations: "flora and fauna, native fauna, diverse fauna",
      example: "Australia is renowned worldwide for its unique endemic fauna, including the platypus and koala.",
      ielts_tip: "Luôn kết hợp cụm 'flora and fauna' để tạo phong cách học thuật trang trọng cho bài viết môi trường."
    },
    flora: {
      word: "flora",
      ipa: "/ˈflɔː.rə/",
      pos: "noun",
      def_en: "The plants of a particular region, habitat, or geological period.",
      def_vi: "Hệ thực vật của một khu vực hoặc môi trường sống nhất định.",
      collocations: "flora and fauna, alpine flora, indigenous flora",
      example: "The national park preserves rare alpine flora that cannot survive at lower altitudes.",
      ielts_tip: "Dùng 'indigenous flora' thay cho cách diễn đạt đơn sơ 'local wild flowers and plants'."
    },
    deterioration: {
      word: "deterioration",
      ipa: "/dɪˌtɪə.ri.əˈreɪ.ʃən/",
      pos: "noun",
      def_en: "The process of becoming progressively worse in quality, condition, or character.",
      def_vi: "Sự suy thoái, tình trạng xuống cấp, thoái hóa chất lượng dần theo thời gian.",
      collocations: "environmental deterioration, soil deterioration, rapid deterioration",
      example: "Monoculture farming without crop rotation causes severe soil deterioration.",
      ielts_tip: "'environmental deterioration' là cụm danh từ đắt giá để khái quát sự suy thoái môi trường sống."
    },
    vulnerable: {
      word: "vulnerable",
      ipa: "/ˈvʌl.nər.ə.bəl/",
      pos: "adjective",
      def_en: "Susceptible to physical harm or damage; classified as at risk of extinction in conservation.",
      def_vi: "Dễ bị tổn thương, có nguy cơ gặp nguy hiểm hoặc nằm trong diện bị đe dọa sinh tồn.",
      collocations: "vulnerable species, highly vulnerable, vulnerable ecosystem",
      example: "Mangrove forests are highly vulnerable to commercial shrimp farming and industrial runoff.",
      ielts_tip: "'vulnerable to climate change' là mẫu câu ăn điểm cho các bài luận về thảm họa tự nhiên."
    },
    eradicate: {
      word: "eradicate",
      ipa: "/ɪˈræd.ɪ.keɪt/",
      pos: "verb",
      def_en: "To destroy completely; put an end to pests, diseases, or weeds.",
      def_vi: "Tiêu diệt tận gốc rễ, diệt trừ dứt điểm các loài sâu bọ dịch hại hoặc mầm bệnh.",
      collocations: "eradicate pests, eradicate invasive weeds, completely eradicate",
      example: "Farmers released sterile insects in an ambitious campaign to eradicate crop pests.",
      ielts_tip: "Động từ C2 trang trọng: 'eradicate invasive pests without harming beneficial insects'."
    },
    herbivore: {
      word: "herbivore",
      ipa: "/ˈhɜː.bɪ.vɔːr/",
      pos: "noun",
      def_en: "An animal that feeds mainly or exclusively on plants.",
      def_vi: "Động vật ăn cỏ, động vật chỉ ăn thực vật để sinh sống.",
      collocations: "grazing herbivore, large herbivores, herbivore populations",
      example: "Zebras and wildebeests are migratory herbivores that travel hundreds of miles in search of fresh pasture.",
      ielts_tip: "Phân biệt bộ ba dinh dưỡng sinh thái: herbivore (ăn cỏ) - carnivore (ăn thịt) - omnivore (ăn tạp)."
    },
    carnivore: {
      word: "carnivore",
      ipa: "/ˈkɑː.nɪ.vɔːr/",
      pos: "noun",
      def_en: "An animal that feeds on flesh or meat of other animals.",
      def_vi: "Động vật ăn thịt, loài sinh vật tiêu thụ thịt động vật khác để duy trì sự sống.",
      collocations: "ferocious carnivore, large carnivores, obligatory carnivore",
      example: "Big cats such as leopards and cheetahs are specialized carnivores with exceptional hunting prowess.",
      ielts_tip: "Dùng để giải thích bậc dinh dưỡng: 'carnivores occupy the upper trophic levels in terrestrial food webs'."
    },
    domesticate: {
      word: "domesticate",
      ipa: "/dəˈmes.tɪ.keɪt/",
      pos: "verb",
      def_en: "To tame an animal and keep it as a pet or for farm produce, or to cultivate a wild plant for food.",
      def_vi: "Thuần hóa động vật hoang dã hoặc chọn tạo giống cây hoang thành cây trồng vật nuôi gia đình.",
      collocations: "domesticate animals, domesticated species, wild ancestors",
      example: "Early Neolithic pastoralists domesticated wild sheep and goats to secure dairy and wool supplies.",
      ielts_tip: "'domesticate wild species' là thuật ngữ nhân học và nông học chuẩn xác trong IELTS Reading & Writing."
    }
  }
};
