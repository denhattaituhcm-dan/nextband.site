import { ReadingCase } from "@/features/reading/types";

export const CASE_013: ReadingCase = {
  id: "case-013",
  title: "The Rewilding Paradox: Apex Predators, Trophic Cascades, and Rural Livelihoods",
  level: {
    realm: "HOC_BA",
    realm_name_vi: "Học Bá",
    ielts_band: 8.0,
    difficulty: 4,
  },
  universe: {
    type: "REAL_WORLD",
    name: "National Geographic & Nature Ecology Archive",
  },
  estimated_minutes: 14,
  sources: [
    {
      id: "source-01",
      type: "article",
      title: "The Return of the Sovereign Hunter",
      subtitle: "Ecological Field Dispatches · The Greater Yellowstone & European Rewilding Corridors",
      paragraphs: [
        {
          id: "p01",
          text: "When gray wolves (Canis lupus) were systematically eradicated from North America's premier national parks in the early twentieth century, ecologists presumed that eliminating top-tier carnivores would foster tranquil, ungulate-dominated paradises. Instead, the decimation of apex predators precipitated catastrophic ecological unraveling. Without predatory pressure, elk populations exploded, overbrowsing willow and aspen saplings along riparian banks, causing rampant soil erosion and driving native beaver and songbird colonies to local extinction.",
        },
        {
          id: "p02",
          text: "The historic reintroduction of fourteen Canadian gray wolves into Yellowstone in 1995 demonstrated the paradigm of 'trophic cascades'—a ecological ripple effect initiated at the summit of the food web. By reinstating an omnipresent 'landscape of fear,' wolves curtailed herbivore complacency. Elk abandoned fragile stream valleys, allowing riparian vegetation to regenerate, which stabilized riverbanks, cooled water temperatures for cutthroat trout, and enabled beavers to rebuild hydrological dams, fundamentally altering river geography.",
        },
      ],
    },
    {
      id: "source-02",
      type: "scientific_report",
      title: "Landscape Permeability & Anthropogenic Friction",
      subtitle: "Rewilding Europe Technical Bulletin · Ecological Corridors vs. Human Encroachment",
      paragraphs: [
        {
          id: "p03",
          text: "In densely populated Western Europe, rewilding initiatives for the Eurasian lynx, brown bear, and Iberian wolf face radically different topographical realities than the boundless wilderness of North America. Here, apex predators inhabit highly fragmented agricultural mosaics crisscrossed by trans-continental highways, suburban sprawling subdivisions, and industrial pasturelands, creating perpetual friction points between carnivore territories and human settlements.",
        },
        {
          id: "p04",
          text: "Conservation biologists advocate for ecological corridors—forested overpasses, contiguous green belts, and riparian buffer zones designed to restore 'landscape permeability.' These biophilic transit routes allow large wide-ranging mammals to traverse anthropogenically fragmented terrains without becoming roadkill victims, maintaining indispensable genetic flow between isolated populations and preventing deleterious inbreeding depression.",
        },
      ],
    },
    {
      id: "source-03",
      type: "digital_audit",
      title: "The Agrarian Backlash: Pastoral Economics vs. Ecocentric Romanticism",
      subtitle: "Socio-Ecological Policy Review · The Livestock Predation Controversy",
      paragraphs: [
        {
          id: "p05",
          text: "While urban environmentalists celebrate the aesthetic and moral resurgence of apex predators, pastoral farming communities bear the asymmetric brunt of rewilding policies. For rural sheep herders and cattle ranchers across the Pyrenees, the Alps, and the Carpathian Mountains, nightly predator attacks inflict crippling economic devastation, emotional trauma, and the obsolescence of centuries-old free-range transhumance traditions.",
        },
        {
          id: "p06",
          text: "Governmental compensation schemes for livestock depredation are routinely criticized by agrarians as bureaucratic, delayed, and insufficient to offset indirect losses such as stress-induced livestock abortions and decreased lactation. True long-term coexistence demands moving beyond ecocentric romanticism: subsidizing non-lethal deterrent infrastructure—such as electric fladry fencing and Maremma livestock guardian dogs—while actively integrating local rural stakeholders into conservation decision-making architectures.",
        },
      ],
    },
  ],

  tasks: [
    {
      id: "task-01",
      type: "FIND",
      question: "According to Source 1, what negative ecological consequence occurred following the historic extermination of gray wolves in Yellowstone?",
      options: [
        { id: "A", text: "Elk populations vanished completely due to mysterious fungal infections." },
        { id: "B", text: "Unchecked elk herds overgrazed riparian saplings, triggering severe riverbank erosion and driving out native beavers and songbirds." },
        { id: "C", text: "Rivers dried up completely due to geothermal volcanic eruptions." },
        { id: "D", text: "Wild boars replaced wolves as the dominant aquatic hunters in alpine lakes." },
      ],
      answer: "B",
      evidence_paragraph_id: "p01",
      explanation: "Source 1 (đoạn 1) nêu rõ: Việc tiêu diệt loài sói khiến số lượng hươu nai bùng nổ, gặm trơ trụi thảm thực vật non ven sông ('overbrowsing willow and aspen saplings along riparian banks'), dẫn tới xói mòn đất trầm trọng và đẩy các loài hải ly, chim bản địa vào nguy cơ tuyệt chủng cục bộ.",
    },
    {
      id: "task-02",
      type: "MATCH",
      question: "According to Source 2, what primary function do 'ecological corridors' serve in human-fragmented European landscapes?",
      options: [
        { id: "A", text: "They act as permanent tourist safari racetracks for high-speed off-road vehicles." },
        { id: "B", text: "They restore landscape permeability, allowing wide-ranging carnivores to cross fragmented terrains and maintain crucial genetic exchange." },
        { id: "C", text: "They provide concrete barriers that permanently confine all wild predators inside suburban golf courses." },
        { id: "D", text: "They redirect predator movements directly into commercial livestock slaughterhouses." },
      ],
      answer: "B",
      evidence_paragraph_id: "p04",
      explanation: "Source 2 (đoạn 2) định nghĩa hành lang sinh thái: thiết lập các tuyến cầu vượt xanh, dải đệm rừng phục hồi độ thấm cảnh quan ('restore landscape permeability'), giúp các loài thú lớn di chuyển qua vùng đất bị chia cắt mà không bị đâm xe, bảo tồn dòng gen và ngăn chặn giao phối cận huyết thoái hóa giống.",
    },
    {
      id: "task-03",
      type: "INFER",
      question: "What does the author in Source 3 suggest is necessary to achieve sustainable coexistence between apex predators and rural farming communities?",
      options: [
        { id: "A", text: "Complete re-extermination of all wolves and bears across the European continent." },
        { id: "B", text: "Replacing monetary compensation with non-lethal deterrent subsidies and incorporating rural agrarians into conservation governance." },
        { id: "C", text: "Forcing all sheep farmers to relocate permanently to offshore wind farms." },
        { id: "D", text: "Replacing real farm animals with automated robotic livestock." },
      ],
      answer: "B",
      evidence_paragraph_id: "p06",
      explanation: "Source 3 (đoạn 2) kết luận giải pháp thực tiễn: thay vì chỉ bồi thường chậm trễ trên giấy tờ, cần hỗ trợ tài chính cho các biện pháp răn đe không gây chết (như hàng rào điện, chó chăn cừu bảo hộ) và mời người dân bản địa tham gia vào các cơ chế ra quyết định bảo tồn.",
    },
    {
      id: "task-04",
      type: "PROVE",
      question: "Click directly on the sentence in Source 1 that explains the concept of 'trophic cascades' as an ecological chain reaction stemming from top predators.",
      instruction: "Click directly on the sentence in Source 1 that explains the concept of 'trophic cascades' as an ecological chain reaction stemming from top predators.",
      target_paragraph_id: "p02",
      target_sentence: "The historic reintroduction of fourteen Canadian gray wolves into Yellowstone in 1995 demonstrated the paradigm of 'trophic cascades'—a ecological ripple effect initiated at the summit of the food web.",
      explanation: "Câu mở đầu đoạn 2 tại Source 1 đưa ra định nghĩa chuẩn xác: 'The historic reintroduction of fourteen Canadian gray wolves into Yellowstone in 1995 demonstrated the paradigm of 'trophic cascades'—a ecological ripple effect initiated at the summit of the food web.'",
    },
  ],

  final_deduction: {
    question: "Synthesizing all three sources, what is the central paradox and key imperative of modern apex predator rewilding?",
    options: [
      {
        id: "hyp-1",
        text: "Apex predator rewilding is an undeniable ecological triumph that restores trophic equilibrium, yet in anthropized landscapes it inevitably generates acute socioeconomic clashes that require pragmatic non-lethal coexistence rather than ecocentric idealism.",
      },
      {
        id: "hyp-2",
        text: "Carnivore restoration should be immediately abandoned because modern technology renders natural ecosystems redundant.",
      },
      {
        id: "hyp-3",
        text: "Wolves and bears prefer to consume cultivated corn crops rather than prey upon wild ungulates or domestic cattle.",
      },
    ],
    correct_hypothesis: "hyp-1",
    required_evidence_pool: [
      {
        id: "ev-01",
        paragraph_id: "p02",
        label: "Wolf reintroduction triggered trophic cascades that stabilized riparian soil and revitalized biodiversity (Source 1).",
      },
      {
        id: "ev-02",
        paragraph_id: "p03",
        label: "European rewilding confronts heavy landscape fragmentation, highways, and human encroachment (Source 2).",
      },
      {
        id: "ev-03",
        paragraph_id: "p05",
        label: "Pastoral farming communities face severe economic devastation from livestock depredation (Source 3).",
      },
      {
        id: "ev-04",
        paragraph_id: "p06",
        label: "Sustainable coexistence demands non-lethal deterrent infrastructure and participatory governance (Source 3).",
      },
    ],
    correct_evidence_ids: ["ev-01", "ev-03", "ev-04"],
    explanation: "Bài đọc tổng hợp chỉ ra 'Nghịch lý Rewilding': Về mặt sinh thái học, dã hóa thú săn mồi đầu chuỗi tạo ra hiệu ứng thác ghềnh dinh dưỡng (trophic cascades) phục hồi sinh thái ngoạn mục; tuy nhiên trong thế giới đương đại đầy phân mảnh, nó tạo ra xung đột gay gắt với sinh kế của nông dân chăn thả gia súc. Do đó, bảo tồn không thể chỉ dựa vào lãng mạn hóa môi trường mà phải đi liền với công nghệ bảo vệ phi sát thương và đồng thuận xã hội.",
  },

  vocabulary: [],

  autopsy: {
    traps: [
      {
        type: "EXTREME_GENERALIZATION",
        description: "Bẫy tuyệt đối hóa quan điểm: một bên coi việc thả thú dữ là cứu cánh thiên nhiên duy nhất không tì vết, bên kia coi thú ăn thịt là tai họa cần diệt trừ tận gốc. Cả hai đều bỏ qua giải pháp dung hòa sinh thái - xã hội (socio-ecological coexistence).",
      },
    ],
    takeaways: [
      "Hiểu sâu thuật ngữ 'Trophic cascades' (Hiệu ứng thác ghềnh dinh dưỡng) và 'Apex predators' (Động vật ăn thịt đầu chuỗi).",
      "Khái niệm 'Landscape permeability' (Độ thấm của cảnh quan) và 'Ecological corridors' (Hành lang sinh thái bắc qua cao tốc/đô thị).",
      "Từ vựng đắt giá cho chủ đề Môi trường & Động vật học: 'ungulate browsing', 'riparian banks', 'anthropogenic friction', 'livestock depredation', 'non-lethal deterrents', 'transhumance traditions'.",
    ],
  },
};
