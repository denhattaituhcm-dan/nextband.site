import { ReadingCase } from "@/features/reading/types";

export const CASE_014: ReadingCase = {
  id: "case-014",
  title: "The Wondrous World of Fungi: Microbial Stowaways, the Human Mycobiome, and Living Textiles",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 8.0,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "National Geographic · Fungi Science & Biotechnology Archive",
  },
  estimated_minutes: 15,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "Nature's Strange Hitchhikers",
      subtitle: "Forestry Field Dispatches · Invasive Ectomycorrhizae & Ecological Disruption",
      paragraphs: [
        {
          id: "p01",
          text: "Anne Pringle was surveying mushrooms at a field site in Tomales Bay State Park, just north of San Francisco, when she found herself in an unsettling predicament. She was surrounded by a sea of one of the world's most dangerous fungi: Amanita phalloides, commonly known as the death cap. \"I couldn't put my foot down without stepping on them,\" Pringle recalls. \"It was just a valley of death—a total infestation.\" Despite its rapid proliferation across the Pacific coast, the deadly mushroom had not originated on American soil; subsequent DNA sequencing confirmed that this virulent invader was an ecological hitchhiker native to European forests, having arrived as covert stowaways on the root systems of imported cork oak seedlings.",
        },
        {
          id: "p02",
          text: "Unlike saprophytic decomposers, death caps are ectomycorrhizal fungi that form intimate symbiotic partnerships, wrapping around tree roots to exchange mineral nutrients for photosynthetic sugars. However, as global warming and human commerce accelerate biological introductions, these underground networks have become profoundly rewired. Unbound from their native co-evolved checks, foreign mycorrhizal fungi can spread voraciously through native timberlands and proliferate across vulnerable habitats. When environmental conditions go haywire, opportunistic fungal pathogens inflict devastating cankers—echoing the historical chestnut blight—fundamentally disrupting the metabolic equilibrium of pristine woodland ecosystems.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "The Fungus Within Us",
      subtitle: "Metagenomic Medicine · The Tumor Microenvironment & Intracellular Mycobiomes",
      paragraphs: [
        {
          id: "p03",
          text: "For decades, oncologists viewed malignant tumors strictly through the lens of human cellular mutations, but groundbreaking metagenomic profiling has revealed an unexpected resident within neoplastic tissue: the human mycobiome. Far from being sterile microenvironments, cancerous tumors harbor specialized fungal communities that thrive within necrotic niches. While commensal yeasts normally inhabit our mucosal barriers in mutualistic equilibrium, systemic stress or chronic inflammation can trigger severe dysbiosis. Under these destabilized conditions, previously benign fungal populations run amok, breaching physiological compartments and migrating deep into adjacent parenchymal tissues.",
        },
        {
          id: "p04",
          text: "At New York University and Weill Cornell Medicine, immunologists examining gastrointestinal and pancreatic malignancies discovered that intracellular fungi actively reprogram local immune responses. Instead of mobilizing cytotoxic defenses, certain fungal genera accelerate oncogenesis by suppressing macrophage surveillance and recruiting immunosuppressive myeloid cells to shield malignant growths. Intriguingly, fungi are heterotrophs that secrete potent degradative enzymes to break down extracellular matrices, inadvertently facilitating tumor metastasis. Unraveling the distinct fungal signatures embedded within tumors now offers revolutionary diagnostic biomarkers for detecting insidious cancers before macroscopic lesions appear.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "Growing the Future of Fashion",
      subtitle: "Biomaterial Engineering · Ancestral Amadou Craft & Mycelial Bio-Fabrication",
      paragraphs: [
        {
          id: "p05",
          text: "In the dense mountain forests of present-day Romania, a dwindling guild of master artisans still practices the ancient craft of harvesting hoof fungus (Fomes fomentarius) from decaying beech trunks, boiling and hand-stretching the inner fungal fibers into soft, breathable amadou felt. Today, this ancestral heritage is being radically reinvented by industrial biotechnology start-ups pioneering mycotextiles. Rather than harvesting wild fruiting bodies, material engineers cultivate fungal strains inside bioreactor chambers, suspending delicate vegetative threads in an aerated nutrient slurry that can be cast into custom three-dimensional geometries without generating toxic tanning waste.",
        },
        {
          id: "p06",
          text: "To produce high-tensile vegan bio-leather, technicians pour dense mycelium cultures over biodegradable fabric scaffolding, providing a structural matrix through which the organism voraciously feeds and grows. Over several weeks, the living mycelium wends its way through every pore of the woven lattice, binding the fibers into an unbreakable composite sheet before gentle thermal processing halts cellular growth. High-fashion ateliers are now integrating this circular material into luxury apparel, applying intricate appliqué embellishments to demonstrate that regenerative biomaterials can effortlessly rival bovine leather in tensile strength, supple texture, and aesthetic longevity.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, how did the invasive death cap mushroom (Amanita phalloides) originally enter North American ecosystems?",
      options: [
        { id: "A", text: "By airborne fungal spores drifting directly across the Atlantic ocean during severe hurricanes." },
        { id: "B", text: "As covert stowaways on the underground root networks of imported European cork oak seedlings." },
        { id: "C", text: "Through deliberate genetic experimentation conducted at Berkeley agricultural laboratories." },
        { id: "D", text: "Via contaminated ballast water discharged into San Francisco Bay by cargo freighters." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) chỉ rõ: Các giải trình tự DNA đã chứng minh nấm tử thần Death Cap là kẻ ngoại lai xâm lấn từ châu Âu, du nhập vào Bắc Mỹ dưới dạng những kẻ 'đi nhờ xe' bí mật (covert stowaways) bám trên hệ rễ của các cây sồi bần (cork oak seedlings) nhập khẩu.",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, how do certain fungal genera within the human mycobiome promote cancer progression inside tumor microenvironments?",
      options: [
        { id: "A", text: "They directly devour human red blood cells to cause chronic anemia." },
        { id: "B", text: "They actively reprogram the local immune system by suppressing macrophage surveillance and secreting enzymes that facilitate metastasis." },
        { id: "C", text: "They neutralize chemotherapy drugs by turning tumors into solid calcified bone." },
        { id: "D", text: "They replace human mitochondria with photosynthetic fungal chloroplasts." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 (đoạn 2) mô tả: Nấm nội sinh trong khối u tái lập trình phản ứng miễn dịch cục bộ bằng cách triệt tiêu sự giám sát của đại thực bào (suppressing macrophage surveillance), chiêu mộ tế bào tủy ức chế miễn dịch và tiết enzym phá vỡ chất nền ngoại bào làm tăng tốc di căn.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What primary technological advantage does the 'bioreactor nutrient slurry' method described in Source 3 offer over traditional leather manufacturing?",
      options: [
        { id: "A", text: "It allows materials to be cultivated directly into seamless 3D geometries while completely eliminating hazardous chemical tanning effluents." },
        { id: "B", text: "It permanently replaces plastic polyester fibers with radioactive mushroom isotopes." },
        { id: "C", text: "It requires freezing live cattle skins in liquid nitrogen before fungal inoculation." },
        { id: "D", text: "It forces Romanian artisans to abandon mushroom harvesting and enter computerized software engineering." },
      ],
      answer: "A",
      evidence_paragraph_id: "p05",
      explanation: "Source 3 (đoạn 1) khẳng định ưu thế của công nghệ mycotextiles: nuôi cấy sợi nấm trong hỗn dịch dinh dưỡng lỏng (nutrient slurry) cho phép đổ khuôn đúc thành các hình khối 3D tùy biến mà không phát sinh chất thải hóa chất độc hại từ quy trình thuộc da truyền thống.",
    },
    {
      id: "task-04",
      type: "PROVE",
      question: "Click directly on the sentence in Source 3 that explains how mycelium physically integrates with fabric scaffolding to produce a composite bio-material.",
      instruction: "Click directly on the sentence in Source 3 that explains how mycelium physically integrates with fabric scaffolding to produce a composite bio-material.",
      target_paragraph_id: "p06",
      target_sentence: "Over several weeks, the living mycelium wends its way through every pore of the woven lattice, binding the fibers into an unbreakable composite sheet before gentle thermal processing halts cellular growth.",
      explanation: "Câu thứ hai trong đoạn 6 (Source 3) miêu tả trực quan quá trình tích hợp cơ học: 'Over several weeks, the living mycelium wends its way through every pore of the woven lattice, binding the fibers into an unbreakable composite sheet before gentle thermal processing halts cellular growth.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what profound insight emerges regarding the ecological and technological duality of the fungal kingdom in the Anthropocene?",
    options: [
      {
        id: "hyp-1",
        text: "Fungi represent a powerful double-edged sword: while disrupted ecosystems and internal dysbiosis allow invasive and opportunistic fungi to wreak ecological havoc and oncogenesis, their extraordinary vegetative adaptability can be harnessed to pioneer sustainable biomaterials and precision diagnostics.",
      },
      {
        id: "hyp-2",
        text: "Fungi are strictly destructive parasites that must be comprehensively eradicated from human bodies and global forests using high-potency chemical fungicides.",
      },
      {
        id: "hyp-3",
        text: "The industrial cultivation of mycelial bio-leather has permanently solved global climate change and rendered animal agriculture entirely obsolete.",
      },
    ],
    correct_hypothesis: "hyp-1",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p01",
        label: "European death caps invaded North America as covert stowaways on imported tree seedlings, proliferating into lethal infestations (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p02",
        label: "Rewired mycorrhizal networks and climate shifts allow fungal pathogens to inflict devastating cankers and disrupt forest equilibrium (Source 1).",
      },
      {
        id: "ev-03",
        paragraph_id: "p03",
        label: "Internal dysbiosis causes commensal gut fungi to run amok, infiltrating tumors and driving oncogenesis (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Mycelium grown through fabric scaffolding yields high-tensile, circular vegan bio-leather for luxury fashion (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-03", "ev-04"],
    explanation: "Cả 3 nguồn cùng phác họa tính 'lưỡng phân' (duality) sâu sắc của giới nấm: Khi các rào cản sinh học bị phá vỡ (do thương mại toàn cầu, biến đổi khí hậu hay suy giảm miễn dịch), nấm ngoại lai và nấm nội sinh có thể tàn phá rừng già và thúc đẩy ung bướu; tuy nhiên khi được thấu hiểu và kiểm soát, cơ chế sinh học độc đáo của sợi nấm (mycelium) lại mở ra kỷ nguyên vật liệu sinh học tự phân hủy và chỉ dấu sinh học y khoa vượt bậc.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "FALSE_DICHOTOMY",
        description: "Bẫy phân cực nhị nguyên: Coi nấm hoặc là 'thần dược cứu rỗi môi trường' hoặc là 'mầm bệnh hủy diệt', bỏ qua bản chất trung tính của nấm trong việc thích ứng và tương tác sinh thái phụ thuộc vào trạng thái cân bằng của vật chủ.",
      },
    ],
    takeaways: [
      "Nắm vững các thuật ngữ sinh thái học nấm: 'Ectomycorrhizal fungi' (Nấm rễ ngoại sinh), 'Saprophytic decomposers' (Sinh vật hoại sinh), 'Dysbiosis' (Mất cân bằng vi sinh).",
      "Khái niệm y khoa tiên phong: 'Human mycobiome' (Hệ nấm nội sinh) và 'Tumor microenvironment' (Vi môi trường khối u).",
      "Từ vựng đắt giá về công nghệ sinh học và vật liệu: 'Bioreactor slurry', 'Mycelial bio-fabrication', 'Fabric scaffolding', 'High-tensile composite sheet', 'Circular luxury fashion'.",
    ],
  },
};
