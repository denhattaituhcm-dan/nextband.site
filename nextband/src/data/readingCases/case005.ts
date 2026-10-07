import { ReadingCase } from "@/features/reading/types";

export const CASE_005: ReadingCase = {
  id: "case-005",
  title: "The Techno-Fix Myth: Why Green Technology Alone Cannot Avert Ecological Collapse",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "The Guardian Opinion & Environmental Political Economy Archive",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Seduction of the Technological Panacea",
      subtitle: "The Guardian Opinion · Climate & Planetary Boundaries Column",
      paragraphs: [
        {
          id: "p01",
          text: "In contemporary climate diplomacy, political and corporate elites increasingly converge around an alluring consensus: that catastrophic ecological breakdown can be arrested purely through technological ingenuity. From direct air carbon capture and solar geoengineering to electric vehicle fleets, innovation is presented as a miraculous panacea that allows industrial civilization to sustain limitless economic growth without fundamental compromise.",
        },
        {
          id: "p02",
          text: "However, treating climate change merely as an engineering defect glosses over the systemic driver of planetary degradation. By framing the crisis as a technical glitch rather than an inherent consequence of relentless resource extraction and fossil-fuel dependency, policymakers postpone the essential cultural reckoning: acknowledging that an infinite growth paradigm is fundamentally incompatible with finite biophysical boundaries.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Resource Decoupling & The Jevons Paradox",
      subtitle: "Ecological Economics Assessment · Stockholm Resilience Centre",
      paragraphs: [
        {
          id: "p03",
          text: "Green growth discourse relies heavily on the hypothesis of 'absolute decoupling'—the premise that economic output can expand indefinitely while material consumption and environmental degradation decline. Yet longitudinal empirical data across multiple continents reveals that such decoupling remains localized, transient, and overwhelmingly insufficient to reverse biodiversity loss.",
        },
        {
          id: "p04",
          text: "Furthermore, technological efficiency improvements frequently trigger the classic Jevons Paradox: as energy efficiency increases and unit costs fall, aggregate consumption escalates rather than diminishes. Electric vehicles, for instance, mitigate tailpipe emissions but require massive mineral extraction—lithium, cobalt, and rare earths—often devastating sensitive habitats in the global South and shifting ecological devastation across supply chains.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "From Technocracy to Systemic Political Economy",
      subtitle: "Global Policy Forum · Ecological Stewardship Manifest",
      paragraphs: [
        {
          id: "p05",
          text: "Averting irreversible tipping points demands a deliberate transition from technocratic optimism toward structural political reform. While renewable infrastructure is indispensable, technology must operate within rigorous ecological thresholds and statutory resource caps rather than serving as a commercial alibi for continued overconsumption.",
        },
        {
          id: "p06",
          text: "Ultimately, addressing ecological breakdown requires recalibrating societal success beyond gross domestic product. True sustainability hinges on sufficiency policies, circular economic stewardship, and equitable distribution, ensuring that basic human wellbeing is prioritized over unchecked capital accumulation.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, why do political and business leaders readily embrace the technological narrative?",
      options: [
        { id: "A", text: "It promises that catastrophic climate change can be resolved without sacrificing continuous economic growth." },
        { id: "B", text: "It has been proven to eliminate greenhouse gas emissions completely within five years." },
        { id: "C", text: "It transfers all environmental responsibilities to private space exploration agencies." },
        { id: "D", text: "It allows national governments to immediately dissolve their environmental ministries." },
      ],
      answer: "A",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) nêu rõ lý do công nghệ xanh được giới lãnh đạo ưa chuộng: 'innovation is presented as a miraculous panacea that allows industrial civilization to sustain limitless economic growth without fundamental compromise.'",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what unintended consequence does the Jevons Paradox describe regarding technological efficiency?",
      options: [
        { id: "A", text: "Lowering production costs leads consumers to abandon digital electronics for physical goods." },
        { id: "B", text: "Efficiency improvements reduce unit costs, which paradoxically drives up overall aggregate consumption." },
        { id: "C", text: "Solar panel manufacturing directly causes atmospheric ozone depletion." },
        { id: "D", text: "Mining companies voluntarily halt resource extraction when mineral prices drop." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 (đoạn 2) giải thích bản chất Jevons Paradox: 'as energy efficiency increases and unit costs fall, aggregate consumption escalates rather than diminishes.'",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 2 imply when discussing the mineral supply chain of electric vehicles?",
      options: [
        { id: "A", text: "Electric vehicles are completely ineffective at reducing urban air pollution." },
        { id: "B", text: "Technological solutions often merely displace environmental damage to other geographical regions or natural resources." },
        { id: "C", text: "Developing countries have banned lithium mining to protect biodiversity reserves." },
        { id: "D", text: "Automobile manufacturers should return to manufacturing diesel-powered transport." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 dẫn chứng rằng xe điện dù giảm phát thải ống xả nhưng đòi hỏi khai thác khoáng sản khổng lồ (lithium, cobalt), 'often devastating sensitive habitats in the global South and shifting ecological devastation across supply chains' — tức dịch chuyển tổn hại sinh thái sang nơi khác.",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that explains what true sustainability fundamentally depends on instead of unchecked GDP growth.",
      target_paragraph_id: "p06",
      target_sentence: "True sustainability hinges on sufficiency policies, circular economic stewardship, and equitable distribution, ensuring that basic human wellbeing is prioritized over unchecked capital accumulation.",
      explanation: "Source 3 (đoạn 2) chỉ ra nền tảng của sự bền vững đích thực: 'True sustainability hinges on sufficiency policies, circular economic stewardship, and equitable distribution, ensuring that basic human wellbeing is prioritized over unchecked capital accumulation.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the central thesis regarding green technology and ecological sustainability?",
    options: [
      {
        id: "hyp-1",
        text: "Technological Determinism: Clean energy inventions will effortlessly outpace resource depletion without any legal regulation.",
      },
      {
        id: "hyp-2",
        text: "The Limits of Green Tech: While vital, technology alone cannot resolve the ecological crisis without systemic political reform, respect for biophysical boundaries, and curbs on overconsumption.",
      },
      {
        id: "hyp-3",
        text: "Industrial Abandonment: Modern society must dismantle all electrical grids and revert to primitive agrarian livelihoods.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "An infinite growth paradigm is fundamentally incompatible with finite biophysical boundaries (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p04",
        label: "Efficiency gains trigger Jevons Paradox and supply-chain displacement of ecological devastation (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Technology must operate within ecological thresholds and resource caps rather than as an alibi for overconsumption (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Sustainability hinges on sufficiency policies and circular stewardship over unchecked capital accumulation (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-03", "ev-04"],
    explanation: "Cả 3 nguồn cùng khẳng định: Công nghệ xanh là điều kiện cần nhưng không phải là điều kiện đủ. Nếu không có cải cách chính sách mang tính hệ thống (systemic reform), tôn trọng các ngưỡng sinh thái (biophysical thresholds) và thay đổi mô hình tăng trưởng vô hạn, thì đổi mới kỹ thuật sẽ chỉ dịch chuyển hoặc làm trầm trọng thêm sự cạn kiệt tài nguyên toàn cầu.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng tác giả phản đối hoàn toàn năng lượng tái tạo và xe điện. Thực tế, bài viết nhấn mạnh công nghệ sạch là cần thiết ('renewable infrastructure is indispensable'), nhưng nguy hiểm khi bị dùng làm bình phong ('commercial alibi') để lảng tránh thay đổi thói quen tiêu dùng vô độ và cải cách cấu trúc kinh tế.",
      },
    ],
    takeaways: [
      "Hiện tượng Jevons Paradox: Càng nâng cao hiệu suất năng lượng thì tổng mức tiêu thụ tài nguyên càng tăng.",
      "Ảo tưởng về 'Absolute Decoupling' (tách rời hoàn toàn giữa tăng trưởng kinh tế và tàn phá tài nguyên).",
      "Collocations đắt giá cho IELTS Writing Task 2 chủ đề Environment: 'technological panacea', 'biophysical boundaries', 'fossil-fuel dependency', 'ecological thresholds', 'circular economic stewardship'.",
    ],
  },
};
