import { ReadingCase } from "@/features/reading/types";

export const CASE_012: ReadingCase = {
  id: "case-012",
  title: "Lasers Beneath the Canopy: How LiDAR Archaeology Is Rewriting Ancient Civilizations",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 7.5,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "National Geographic · Archaeology & Remote Sensing Archive",
  },
  estimated_minutes: 13,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "Peering Through the Green Blanket",
      subtitle: "National Geographic Field Report · The Maya Biosphere Jungle Survey",
      paragraphs: [
        {
          id: "p01",
          text: "For more than a century, classical archaeologists hacking through the dense tropical rainforests of northern Guatemala operated under the conviction that ancient Maya society consisted of isolated, agrarian ceremonial centres. The suffocating jungle canopy, impenetrable undergrowth, and malarial swamps preserved the ruins from plunder, but also blinded researchers to their true territorial magnitude.",
        },
        {
          id: "p02",
          text: "That century-old paradigm dissolved overnight with the arrival of airborne LiDAR (Light Detection and Ranging). By mounting laser sensors onto survey aircraft and pulsing hundreds of thousands of light beams per second toward the earth, scientists digitally stripped away the dense jungle foliage, revealing high-resolution bare-earth digital elevation models of an astonishingly interconnected megalopolis.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Sub-Canopy Topography & Hydraulic Engineering",
      subtitle: "PACUNAM LiDAR Initiative Research Consortium · Science & NatGeo Paper",
      paragraphs: [
        {
          id: "p03",
          text: "The LiDAR scans brought to light more than sixty thousand previously undetected structures concealed beneath the jungle floor. Rather than primitive scattered hamlets, archaeologists mapped monumental pyramid complexes, fortified military bastions, and elevated stone causeways—sacbeob—stretching tens of kilometres to connect distant urban hubs, functioning as ancient all-weather interstate highways.",
        },
        {
          id: "p04",
          text: "Most crucially, the digital scans revealed sophisticated hydraulic and agricultural infrastructure: terraced hillsides, canal networks, and expansive drained agricultural wetland fields. This monumental engineering demonstrated that the Maya modified their landscape on an industrial scale, supporting estimated populations of ten to fifteen million people—tripling previous academic consensus and displaying unprecedented resource management sophistication.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Paradigm Shift: From Shovel to Sensor",
      subtitle: "Archaeological Methodological Review · National Geographic Explorers",
      paragraphs: [
        {
          id: "p05",
          text: "LiDAR represents the most profound technological leap in archaeology since the invention of radiocarbon dating in 1949. Traditional ground surveys required decades of grueling physical machete work to map a few square kilometres of ruins. In contrast, remote laser sensing maps thousands of square kilometres in mere days, democratizing spatial analysis and illuminating the subtle footprints of ancient human activity before they are erased.",
        },
        {
          id: "p06",
          text: "Yet technology alone cannot replace the dirt archaeologist. While LiDAR generates miraculous topological blueprints, ground-truthing remains indispensable: verifying subterranean stratigraphy, dating ceramic shards, and excavating residential layers. Together, laser remote sensing and traditional trowel work are rewriting human history, illustrating that ancient civilizations engineered resilient ecosystems long before the dawn of modern urbanization.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, how does airborne LiDAR technology map ancient structures hidden under dense jungles?",
      options: [
        { id: "A", text: "By using chemical herbicides to permanently deforest designated archaeological valleys." },
        { id: "B", text: "By firing hundreds of thousands of laser pulses per second and digitally filtering out the canopy foliage to produce bare-earth elevation models." },
        { id: "C", text: "By deploying subterranean robotic moles that tunnel beneath ancient pyramid foundations." },
        { id: "D", text: "By utilizing thermal heat cameras that track underground volcanic magma movements." },
      ],
      answer: "B",
      evidence_paragraph_id: "p02",
      explanation: "Source 1 (đoạn 2) giải thích cơ chế LiDAR: máy bay bắn hàng trăm nghìn xung ánh sáng laser mỗi giây xuống mặt đất và dùng phần mềm kỹ thuật số bóc tách tán lá rừng rậm ('digitally stripped away the dense jungle foliage, revealing high-resolution bare-earth digital elevation models').",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what discovery proved that ancient Maya society supported a population three times larger than previously believed?",
      options: [
        { id: "A", text: "The discovery of massive gold coins minted with Roman numerals." },
        { id: "B", text: "The mapping of sophisticated hydraulic canal systems, agricultural terracing, and drained wetland fields engineered on an industrial scale." },
        { id: "C", text: "The excavation of deep-sea fishing trawlers preserved inside mountain caves." },
        { id: "D", text: "The presence of steam-powered mechanical looms inside domestic kitchens." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 làm rõ bằng chứng then chốt: các phân tích quang học phát hiện hệ thống thủy lợi, ruộng bậc thang và kênh mương thoát nước quy mô công nghiệp ('terraced hillsides, canal networks, and expansive drained agricultural wetland fields... on an industrial scale'), chứng minh xã hội nuôi sống được 10-15 triệu dân.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 argue regarding the relationship between LiDAR technology and traditional physical excavation?",
      options: [
        { id: "A", text: "Laser technology makes manual excavation completely illegal in Central American nations." },
        { id: "B", text: "LiDAR provides essential macroscopic blueprints, but manual ground-truthing remains essential to verify subterranean stratigraphy and historical dating." },
        { id: "C", text: "Field archaeologists should abandon university degrees and work exclusively as drone pilots." },
        { id: "D", text: "Traditional trowels and shovels damage laser wavelengths reflected from stone monuments." },
      ],
      answer: "B",
      evidence_paragraph_id: "p06",
      explanation: "Source 3 (đoạn 2) nhấn mạnh sự kết hợp hài hòa: LiDAR tạo ra bản đồ không gian kỳ diệu, nhưng công tác thực địa đào bới truyền thống ('ground-truthing') vẫn là điều kiện tiên quyết để kiểm tra địa tầng ngầm và giám định niên đại đồ gốm ('ground-truthing remains indispensable: verifying subterranean stratigraphy, dating ceramic shards...').",
    },
    {
      id: "task-04",
      type: "PROVE",
      instruction: "Click directly on the sentence in Source 3 that compares the historical significance of LiDAR to another monumental breakthrough in archaeology.",
      target_paragraph_id: "p05",
      target_sentence: "LiDAR represents the most profound technological leap in archaeology since the invention of radiocarbon dating in 1949.",
      explanation: "Câu mở đầu tại Source 3 (đoạn 1) đưa ra phép so sánh lịch sử mang tính bước ngoặt: 'LiDAR represents the most profound technological leap in archaeology since the invention of radiocarbon dating in 1949.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources from National Geographic, what is the revolutionary impact of LiDAR archaeology on historical understanding?",
    options: [
      {
        id: "hyp-1",
        text: "Agrarian Solitude: Maya ruins proved that ancient societies were completely isolated from one another without communication.",
      },
      {
        id: "hyp-2",
        text: "The Megalopolis Paradigm Shift: Remote laser sensing shattered the myth of primitive, isolated jungle ruins by unveiling vast interconnected urban networks and sophisticated environmental engineering.",
      },
      {
        id: "hyp-3",
        text: "Digital Substitution: Satellites have permanently replaced the need for human historians and museum curators.",
      },
    ],
    correct_hypothesis: "hyp-2",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Airborne LiDAR digitally stripped jungle canopy to unveil an interconnected ancient megalopolis (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p03",
        label: "Over sixty thousand structures and elevated stone highway causeways connected distant cities (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p04",
        label: "Industrial-scale hydraulic canals and agricultural terracing supported fifteen million inhabitants (Source 2).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Coupling remote sensors with ground-truthing proves ancient civilizations engineered resilient urban ecosystems (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-02", "ev-03"],
    explanation: "NatGeo mô tả một cuộc cách mạng nhận thức khảo cổ học: Thay vì là một xã hội nguyên thủy rải rác trong rừng thiêng nước độc, công nghệ quét laser LiDAR đã chứng minh nền văn minh Maya từng là một siêu đô thị kết nối bằng hệ thống cao tốc lát đá (sacbeob) và quy hoạch thủy lợi bậc thầy nuôi sống hàng chục triệu người.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "OVER_INFERENCE",
        description: "Bẫy ngộ nhận rằng có LiDAR rồi thì không cần các nhà khảo cổ đi bộ thực địa cầm xẻng nữa. Bài viết nhấn mạnh 'ground-truthing' (kiểm chứng thực địa) vẫn là bước bắt buộc để xác thực niên đại cổ vật và cấu trúc ngầm.",
      },
    ],
    takeaways: [
      "Công nghệ viễn thám 'Airborne LiDAR (Light Detection and Ranging)' và khả năng tạo 'bare-earth digital elevation models'.",
      "Hệ thống đường cao tốc cổ đại 'Sacbeob' và mạng lưới thủy nông quy mô công nghiệp của người Maya.",
      "Collocations học thuật đẳng cấp cho chủ đề Lịch sử & Khảo cổ: 'sub-canopy topographical mapping', 'radiocarbon dating', 'hydraulic engineering', 'monumental architecture', 'ground-truthing'.",
    ],
  },
};
